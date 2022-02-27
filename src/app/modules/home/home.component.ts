import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data$: PaginationAdapter<FormationModel, FormationQuery>;

  constructor(private service: FormationService) { }

  ngOnInit(): void {
    var initialFormationQuery = new FormationQuery('');
    this.data$ = new PaginationAdapter<FormationModel, FormationQuery>((query, param) => this.service.getAllPublished(query, param), initialFormationQuery);
  }

  public buildImageUrl(url: string) { return Routes.BASE_URL_SERVER_FILE.concat(url) }

}
