import { Pipe, PipeTransform } from '@angular/core';
import { Constants, FormationEventStates, SubscriptionStates } from '../../utils/constants';

@Pipe({
  name: 'statePublished'
})
export class PublishedInfoPipePipe implements PipeTransform {

  transform(state: string): string {
    switch (state) {
      case FormationEventStates.Started: {
        return "A decorrer";
      }
      case FormationEventStates.Waiting: {
        return "Em espera"
      }
      case FormationEventStates.Finished: {
        return "Emitindo certificado"
      }
      case FormationEventStates.Closed: {
        return "Ccertificado emitido"
      }
      case SubscriptionStates.Assessment: {
        return "Emitindo certificado"
      }
      case SubscriptionStates.Rejected: {
        return "Certificado não emitido"
      }
      case SubscriptionStates.Closed: {
        return "Certificado emitido"
      }

    }
  }

}
