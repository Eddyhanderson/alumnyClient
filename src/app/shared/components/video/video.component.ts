import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener, OnDestroy, NgZone, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, } from '@angular/animations';
import { Router } from '@angular/router';
import * as dashjs from 'dashjs';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { MediaPlayerClass } from 'dashjs';

interface VideoElement extends HTMLVideoElement {
  requestPictureInPicture(): any;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations: [
    trigger('playBackToggle', [
      state('open', style({
        transform: 'scale(1)',
        opacity: 0,
      })),
      state('closed', style({
        transform: 'scale(1)',
        opacity: 0
      })),
      transition('open <=> closed', animate('.5s ease-in', keyframes([
        style({ transform: 'scale(1)', opacity: 1, }),
        style({ transform: 'scale(1.3)', opacity: 0, })
      ])))
    ])
  ]

})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  @Input("videoSource") url: string;

  private _url = new BehaviorSubject<string>('');
  @Input("source")
  set source(value) {
    this._url.next(value);
  }

  get source() {
    return this._url.getValue();
  }

  @Input("thumbnail") poster: string;

  @ViewChild('video') video: ElementRef<VideoElement>;

  @ViewChild('progressBar') progressBar: ElementRef<HTMLElement>;

  @ViewChild('seek') seek: ElementRef<HTMLInputElement>;

  @ViewChild('seekTollTip') seekTolltip: ElementRef<HTMLElement>;

  @ViewChild('reprodutionControl') repControl: ElementRef<HTMLButtonElement>;

  @ViewChild('timeElapsed') timeElapsed: ElementRef<HTMLElement>;

  @ViewChild('duration') duration: ElementRef<HTMLElement>;

  @ViewChild('volume') volume: ElementRef<HTMLInputElement>;

  @ViewChild('volumeButton') volumeButton: ElementRef<HTMLButtonElement>;

  @ViewChild('videoControls') videoControls: ElementRef<HTMLDivElement>;

  @ViewChild('videoContainer') videoContainer: ElementRef<HTMLDivElement>;

  @ViewChild('fullscreenButton') fullscreenButton: ElementRef<HTMLDivElement>;

  @ViewChild('pipButton') pipButton: ElementRef<HTMLDivElement>;

  volumeoff: boolean = false;

  volumedown: boolean = false;

  volumeup: boolean = true;

  playBackButton: boolean = false;

  //#region(events declarations )

  playToggle() {

    if (this.video.nativeElement.paused || this.video.nativeElement.ended) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
      this.showDisplayControl();
    }
  }

  playIconToggle() {
    let repControlIcons = this.el.nativeElement.querySelectorAll('#play-button mat-icon');

    repControlIcons.forEach(icon => {
      this.hiddenClassToggle(icon);
    });
  }

  playBackIconToggle() {
    let playBackIcons = this.el.nativeElement.querySelectorAll('#playback-animation mat-icon');

    playBackIcons.forEach(icon => {
      this.hiddenClassToggle(icon);
    });

    this.playBackButton = !this.playBackButton;

  }

  initializationVideo() {
    let videoDuration = Math.round(this.video.nativeElement.duration);

    this.renderer.setAttribute(this.progressBar.nativeElement, 'max', videoDuration.toString());

    this.renderer.setAttribute(this.seek.nativeElement, 'max', videoDuration.toString());

    const time = this.formatTime(videoDuration);

    var value = `${time.minutes}:${time.seconds}`

    this.renderer.setProperty(this.duration.nativeElement, "innerHTML", value);

    this.showDisplayControl();
  }

  displaySeekTooltip(e: MouseEvent) {
    let dxSeek = Math.round((e.offsetX / this.seek.nativeElement.clientWidth) * parseInt(this.seek.nativeElement.getAttribute('max'), 10));

    this.renderer.setAttribute(this.seek.nativeElement, 'data-seek', dxSeek.toString());

    let time = this.formatTime(dxSeek);

    let seekContent = `${time.minutes}:${time.seconds}`;

    const rect = this.video.nativeElement.getBoundingClientRect();


    this.renderer.setStyle(this.seekTolltip.nativeElement, 'left', e.pageX - rect.left + "px");

    this.renderer.setProperty(this.seekTolltip.nativeElement, "innerHTML", seekContent);
  }

  changeTimeReprodution(e: InputEvent) {

    let el = (e.target as HTMLInputElement);

    let time = el.dataset.seek ? el.dataset.seek : el.value;

    this.renderer.setProperty(el, 'value', time);

    this.renderer.setAttribute(this.progressBar.nativeElement, "value", time);

    this.renderer.setProperty(this.video.nativeElement, 'currentTime', time);

  }

  updateElapsedTime() {
    let currentTime = Math.round(this.video.nativeElement.currentTime);

    this.renderer.setProperty(this.seek.nativeElement, 'value', currentTime.toString());

    this.renderer.setAttribute(this.progressBar.nativeElement, 'value', currentTime.toString());

    let time = this.formatTime(currentTime);

    this.renderer.setProperty(this.timeElapsed.nativeElement, "innerHTML", `${time.minutes}:${time.seconds}`);
  }

  updateVolume(e: InputEvent) {
    if (this.video.nativeElement.muted) {
      this.video.nativeElement.muted = false;
    }

    let value = (e.target as HTMLInputElement).valueAsNumber;

    this.renderer.setProperty(this.video.nativeElement, 'volume', value);

    this.updateVolumeIcon();
  }

  updateVolumeIcon() {

    this.volumeoff = false;
    this.volumedown = false;
    this.volumeup = false;

    let videoEl = this.video.nativeElement;

    if (videoEl.muted || videoEl.volume === 0) {
      this.volumeoff = true;
    } else if (videoEl.volume > 0 && videoEl.volume < 0.5) {
      this.volumedown = true;
    } else {
      this.volumeup = true;
    }

  }

  muteVideo() {

    let videoEl = this.video.nativeElement;

    this.renderer.setProperty(videoEl, 'muted', !videoEl.muted);

    if (videoEl.muted) {
      this.renderer.setProperty(this.volume.nativeElement, 'value', 0);
    } else {
      this.renderer.setProperty(this.volume.nativeElement, 'value', videoEl.volume);
    }
  }

  showDisplayControl() {
    let videoControl = this.videoControls.nativeElement;

    this.renderer.addClass(videoControl, 'show');
  }

  hideDisplayControl() {
    let videoEl = this.video.nativeElement;

    let videoControl = this.videoControls.nativeElement;

    if (!videoEl.paused && !document.fullscreenElement)
      this.renderer.removeClass(videoControl, 'show');
  }

  fullScreenModeIconsToggle() {

    let icons = this.el.nativeElement.querySelectorAll('#fullscreen-button mat-icon');

    icons.forEach(icon => {
      this.hiddenClassToggle(icon);
    });
  }

  fullScreenModeToggle() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.videoContainer.nativeElement.requestFullscreen();
    }
  }

  async togglePip() {
    await this.video.nativeElement.requestPictureInPicture();

  }

  togglePipIcon() {
    let pipEl = this.pipButton.nativeElement;

    if (!pipEl.classList.contains('hidden'))
      this.renderer.addClass(pipEl, 'hidden');
    else
      this.renderer.removeClass(pipEl, 'hidden');
  }

  //#endregion


  private initPlayer() {
    var player = dashjs.MediaPlayer().create();
    if (this.url) {
      player.initialize(this.el.nativeElement.querySelector('#video'), this.url, true);
    } else {
      this.initDynamicUrl(player);
    }
  }

  private initDynamicUrl(player: MediaPlayerClass) {
    let url = this._url.getValue();
    player.initialize(this.el.nativeElement.querySelector('#video'), url, true);

    this._url.subscribe((url) => {      
      player.attachSource(url);
    })
  }

  //#region(LIFE CYCLE HOOKS)
  ngAfterViewInit(): void {

    if (!('pictureInPictureEnabled' in document)) {
      this.renderer.addClass(this.pipButton.nativeElement, 'hidden');
    }

    fromEvent(this.seek.nativeElement, 'mouseover').subscribe((e) => {
      this.renderer.listen(e.target, 'mousemove', (e) => this.displaySeekTooltip(e));

      this.renderer.listen(e.target, 'input', (e) => this.changeTimeReprodution(e));
    });

    fromEvent(this.video.nativeElement, 'click').subscribe(() => {
      this.playBackIconToggle();

      this.playToggle()
    });

    fromEvent(this.video.nativeElement, 'enterpictureinpicture').subscribe(() => {
      this.togglePipIcon();
      this.router.navigate(['home']);
    });

    fromEvent(this.videoContainer.nativeElement, 'leavepictureinpicture').subscribe(() => {
      this.togglePipIcon()

      this.router.navigate(['lesson/watch']);
    })

    fromEvent(this.video.nativeElement, 'loadedmetadata').subscribe(() => this.initializationVideo());

    fromEvent(this.video.nativeElement, 'timeupdate').subscribe(() => this.updateElapsedTime());

    fromEvent(this.volume.nativeElement, 'input').subscribe((e: InputEvent) => this.updateVolume(e));

    fromEvent(this.video.nativeElement, 'volumechange').subscribe(() => this.updateVolumeIcon());

    fromEvent(this.video.nativeElement, 'play').subscribe(() => this.playIconToggle());

    fromEvent(this.video.nativeElement, 'pause').subscribe(() => this.playIconToggle());

    fromEvent(this.videoContainer.nativeElement, 'mouseouver').subscribe(() => this.showDisplayControl())

    fromEvent(this.videoContainer.nativeElement, 'mouseleave').subscribe(() => this.hideDisplayControl())

    fromEvent(this.videoContainer.nativeElement, 'fullscreenchange').subscribe(() => this.fullScreenModeIconsToggle())

    fromEvent(this.fullscreenButton.nativeElement, 'click').subscribe(() => this.fullScreenModeToggle())
  }

  ngOnInit(): void {
    this.initPlayer();
  }

  ngOnDestroy(): void {
    this.initializationVideo = null;

    this.updateElapsedTime = null;

    this.displaySeekTooltip = null;

    this._url.unsubscribe();
  }
  //#endregion

  //#region(UTILS)
  private formatTime(seconds: number): any {
    const result = new Date(seconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  }

  private hasClass(el: HTMLElement, className: string) {
    return el.classList.contains(className);
  }

  private hiddenClassToggle(el: HTMLElement) {
    if (!this.hasClass(el, 'hidden')) {
      this.renderer.addClass(el, 'hidden');
    } else {
      this.renderer.removeClass(el, 'hidden');
    }
  }
  //#endregion



}

