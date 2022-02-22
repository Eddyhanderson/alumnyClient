import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './components/video/video.component';
import { MaterialModule } from '../modules/material/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DataFormaterDirective } from './directives/data-formater/data-formater.directive';
import { MessageCallBackDirective } from './directives/message-callBack/message-call-back.directive';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { LoadingItemComponent } from './components/loading-item/loading-item.component';
import { LoadingDeterminateComponent } from './components/loading-determinate/loading-determinate.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { ElapsedTimePipe } from './pipes/elapsed-time';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TextVisualizerComponent } from './components/text-visualizer/text-visualizer.component';
import { TopicCreationComponent } from './components/topic-creation/topic-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherPlacePickerComponent } from './components/teacher-place-picker/teacher-place-picker.component';
import { TopicPickerComponent } from './components/topic-picker/topic-picker.component';
import { LessonDetailFormComponent } from './components/lesson-detail-form/lesson-detail-form.component';
import { LessonTypePipe } from './pipes/lesson-type-pipe/lesson-type.pipe';
import { ImgUrlPipe } from './pipes/img-url-pipe/img-url.pipe';


@NgModule({
  declarations: [
    VideoComponent,
    ProgressBarComponent,
    DataFormaterDirective,
    MessageCallBackDirective,
    LoadingPageComponent,
    LoadingItemComponent,
    LoadingDeterminateComponent,
    TextEditorComponent,
    ElapsedTimePipe,
    BottomSheetComponent,
    TextVisualizerComponent,
    TopicCreationComponent,
    TeacherPlacePickerComponent,
    TopicPickerComponent,
    LessonDetailFormComponent,
    LessonTypePipe,
    ImgUrlPipe],
  exports: [
    TextEditorComponent,
    VideoComponent,
    ProgressBarComponent,
    DataFormaterDirective,
    MessageCallBackDirective,
    LoadingPageComponent,
    LoadingItemComponent,
    LoadingDeterminateComponent,
    ElapsedTimePipe,
    BottomSheetComponent,
    TextVisualizerComponent,
    TopicCreationComponent,
    TeacherPlacePickerComponent,
    TopicPickerComponent,
    LessonDetailFormComponent,
    LessonTypePipe,
    ImgUrlPipe],
  imports: [
    CommonModule,
    MaterialModule,
    MatCarouselModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
