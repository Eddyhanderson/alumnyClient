import { Pipe, PipeTransform } from '@angular/core';
import { Routes } from '../../utils/routing-constants';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string): string {
    return  Routes.BASE_URL_SERVER_FILE.concat(value);
  }
}
