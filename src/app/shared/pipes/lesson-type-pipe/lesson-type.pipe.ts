import { Pipe, PipeTransform } from '@angular/core';
import { Constants, LessonTypes } from '../../utils/constants';

@Pipe({
  name: 'lessonType'
})
export class LessonTypePipe implements PipeTransform {
  article: string = "Artigo";
  video: string = "Vídeo";

  transform(value: string): string {
    return value.toUpperCase() == LessonTypes.Article.toString().toUpperCase() ? this.article : this.video;
  }

}
