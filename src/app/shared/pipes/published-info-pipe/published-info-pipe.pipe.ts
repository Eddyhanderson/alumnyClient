import { Pipe, PipeTransform } from '@angular/core';
import { Constants, FormationEventStates } from '../../utils/constants';

@Pipe({
  name: 'statePublished'
})
export class PublishedInfoPipePipe implements PipeTransform {

  transform(state: string): string {
    switch(state){
      case FormationEventStates.Started : {
        return "A decorrer";        
      }
      case FormationEventStates.Waiting : {
        return "Em espera"
      }

    }
  }

}
