import { Component, OnInit } from '@angular/core';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { SubscriptionModel } from 'src/app/models/subscription-model/subscription-model';
import { SubscriptionQuery } from 'src/app/queries/subscription-query/subscription-query';
import { SubscriptionService } from 'src/app/services/subscription-service/subscription.service';
import { SubscriptionStates } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-certficate-list',
  templateUrl: './certficate-list.component.html',
  styleUrls: ['./certficate-list.component.scss']
})
export class CertficateListComponent implements OnInit {
  studant: StudantModel;

  learning = SubscriptionStates.Learning;
  assessment = SubscriptionStates.Assessment;
  rejected = SubscriptionStates.Rejected;
  closed = SubscriptionStates.Closed;

  constructor(private subscriptionService: SubscriptionService) { }

  data$: PaginationAdapter<SubscriptionModel, SubscriptionQuery>;

  ngOnInit(): void {
    this.getStudant();
    this.getSubscriptions();
  }

  getSubscriptions() {
    if (this.studant) {
      let initialQuery: SubscriptionQuery = {
        studantId: this.studant.id,
        state: [SubscriptionStates.Assessment, SubscriptionStates.Closed, SubscriptionStates.Rejected]
      }
      this.data$ = new PaginationAdapter((query, param) => this.subscriptionService.getAll(query, param), initialQuery);
    }

  }

  getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

}
