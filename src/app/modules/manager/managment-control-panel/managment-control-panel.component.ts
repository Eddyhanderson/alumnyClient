import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { CreateCertificateDialogComponent } from 'src/app/dialogs/certificate/create-certificate-dialog/create-certificate-dialog.component';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { SubscriptionModel } from 'src/app/models/subscription-model/subscription-model';
import { SubscriptionQuery } from 'src/app/queries/subscription-query/subscription-query';
import { SubscriptionService } from 'src/app/services/subscription-service/subscription.service';
import { SubscriptionStates } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-control-panel',
  templateUrl: './managment-control-panel.component.html',
  styleUrls: ['./managment-control-panel.component.scss']
})
export class ManamentControlPanelComponent implements OnInit {
  subscriptions$: PaginationAdapter<SubscriptionModel, SubscriptionQuery>;

  // Models
  school: SchoolModel;
  private _reloadStrategy: any;


  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSchool();
    this.getAllSubscriptions();
    this.setStrategyToReloadPage();
  }

  // Events
  public onCreateCertificate(studantId: string, formationId: string, subscriptionId: string) {
    console.log(`studantId: ${studantId} | formationId:${formationId}`);
    var ref = this.dialog.open(CreateCertificateDialogComponent, {
      data: {
        studantId: studantId,
        formationId: formationId,
        subscriptionId: subscriptionId
      },
      width: '35rem',
      height: '85%'
    });

    ref.afterClosed().subscribe(data => {
      if (data != null && data instanceof Object) {
        this.router.navigateByUrl(this.router.url);
      }
    })
  }

  private getAllSubscriptions() {
    if (this.school) {
      let initialQuery: SubscriptionQuery = {
        state: [SubscriptionStates.Assessment],
        schoolId: this.school.id
      }

      this.subscriptions$ = new PaginationAdapter((page, query) => this.subscriptionService.getAll(page, query), initialQuery);
    }
  }

  private getSchool() {
    this.school = JSON.parse(localStorage.school);
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      async (evt) => {
        if (evt instanceof NavigationEnd) {
          this.subscriptions$.setSearchValue = '';
        }
      }
    )
  }

}
