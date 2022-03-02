import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { VideoModel } from 'src/app/models/video-model/video.model';
import { Response } from 'src/app/models/response/response';
import { VideoService } from '../../../../services/video-service/video.service';
import { VideoUploadSignalR } from '../../../../services/signalRServices/video-upload-signalR';
import { Observable } from 'rxjs';
import { MediaPlayer } from 'dashjs';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { map, startWith } from 'rxjs/operators';
import { DisciplineTopicService } from 'src/app/services/discipline-topic-service/discipline-topic.service';
import { Constants, LessonTypes } from 'src/app/shared/utils/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { Routes } from 'src/app/shared/utils/routing-constants';


@Component({
  selector: 'app-video-lesson-creation',
  templateUrl: './video-lesson-creation.component.html',
  styleUrls: ['./video-lesson-creation.component.scss']
})
export class VideoLessonCreationComponent implements OnInit {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  // To present data


  public lessonsGrouped: [
    {
      disciplineTopic: DisciplineTopicModel,
      lessons: LessonModel[]
    }
  ]

  // Models
  public teacher: TeacherModel;
  public teacherPlace: TeacherPlaceModel;
  public topic: TopicModel;


  public isPublic: boolean = true;
  public video: VideoModel;

  // To handle with video upload 
  public progress: number = 0;
  public manifest: string;
  public thumbnail: string;

  // To handle with video picker
  public videoCtl = new FormControl('', [Validators.required]);

  // To handle with video detail forms
  public titleCtl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(100)])
  public descriptionCtl: FormControl = new FormControl('', Validators.required);
  detailFg: FormGroup;

  // flags
  public loadingMode: boolean = false;
  public submited: boolean = false;
  thumbnailPath: string;

  constructor(
    public dialogRef: MatDialogRef<VideoLessonCreationComponent>,

    private vs: VideoService,
    private vus: VideoUploadSignalR,
    private ls: LessonService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any) { }


  ngOnInit(): void {
    this.initVideoDataObserver();
  }


  public uploadFileEvt(event) {
    var file = event.target.files[0];

    if (file == null) return null;

    this.stepper.next();

    this.loadingMode = true;

    this.vs.upload(file).subscribe(async (event: HttpEvent<Response<VideoModel>>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(((event.loaded * 100.0) / event.total) / 2.0);
          break;
        case HttpEventType.Response:
          this.video = event.body.data;      
          await this.vus.onInit();
          await this.vus.videoUploadWatch(this.video);
          break;
      }
    })
  }

  public async onLessonCreate() {
    if (this.detailFg.valid) {
      this.submited = true;

      let lesson: LessonModel = {
        picture: this.thumbnailPath,
        description: this.detailFg.value.description,
        title: this.detailFg.value.title,
        videoId: this.video.id,
        lessonType: LessonTypes.Video,
        moduleId: this.data.moduleId,
        manifestPath: this.manifest        
      }
      
      let stt = await this.createLesson(lesson);

      if (stt?.succeded) {
        let snackBarRef = this.snackBar.open('Parabéns! Video-aula publicada com sucesso.');

        snackBarRef.afterDismissed().subscribe(() => this.router.navigate(["lesson/managment"], {
          queryParams: {
            'teacherPlaceId': this.teacherPlace.id,
            'topicId': this.topic.id
          }
        }));

        this.dialogRef.close(true);
      } else {
        this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
        this.submited = false;
      }
    }
  }

  private createLesson(lesson: LessonModel) {
    if (lesson == null || lesson == undefined) return null;

    return this.ls.create(lesson);
  }



  public detailForm(group: FormGroup) {
    this.detailFg = group;
  }


  private initVideoDataObserver() {
    // to get video compression progress
    this.vus.conversionProgress.subscribe((data) => {
      this.progress = data + 50;
    });

    // to get thumbnail location
    this.vus.thumbnail.subscribe((data) => {
      this.thumbnailPath = data;
      this.thumbnail = Routes.BASE_URL_SERVER_FILE + data;
    })

    // to get video manifest location
    this.vus.manifest.subscribe((data) => {
      this.progress = 100;
      this.manifest = data;
    })
  }


}
