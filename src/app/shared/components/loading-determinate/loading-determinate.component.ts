import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-loading-determinate',
  templateUrl: './loading-determinate.component.html',
  styleUrls: ['./loading-determinate.component.scss']
})
export class LoadingDeterminateComponent implements OnInit, OnDestroy {

  progressValue: number = 0;
  stopProgress: boolean;

  progressTimer: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      this.catchEvents(event);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.progressTimer);
  }


  ngOnInit(): void {

  }

  private catchEvents(event: any) {

    if (event instanceof NavigationStart) {      
      this.initializeProgressValue();
      this.progressTimer = setInterval(() => {
        this.incrementProgressValue();
      }, 1)
    }

    if (event instanceof NavigationEnd) {
      clearInterval(this.progressTimer);
      this.progressValue = 100;
    }

    if (event instanceof NavigationCancel) {
      this.stopProgress = true;
    }

    if (event instanceof NavigationError) {
      this.stopProgress = true;
    }
  }

  private incrementProgressValue() {
    if (this.progressValue > 95 || this.stopProgress) {
      clearInterval(this.progressTimer);
    } else {
      this.progressValue++;
    }
  }

  private initializeProgressValue() {
    this.progressValue = 0;
  }

}
