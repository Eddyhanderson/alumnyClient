import { BehaviorSubject, Observable, PartialObserver, Subscribable, Subscription, Unsubscribable } from 'rxjs';

import { combineLatest } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { DataSource } from '@angular/cdk/collections';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';

type PaginatedEndpoint<T, Q> = (query: PaginationQuery, param?: Q) => Observable<PageResponse<T>>;

export interface SimpleDataSource<T> extends DataSource<T> {
    connect(): Observable<T[]>;
    disconnect(): void;
}

export class TablePaginationAdapter<T, Q> implements SimpleDataSource<T> {

    private param: BehaviorSubject<Q>;

    set setParam(param: Partial<Q>) {
        const lastParam = this.param.getValue();
        const nextParam = { ...lastParam, ...param }

        this.param.next(nextParam);
    }

    get getParam(): Observable<Q> {
        return this.param.asObservable();
    }

    private pageNumber = new BehaviorSubject(0);

    get getPagNumber() {
        return this.pageNumber.asObservable();
    }

    private searchValue = new BehaviorSubject('');

    set setSearchValue(key: string) {
        this.searchValue.next(key);
    }

    get getSearchValue() {
        return this.searchValue.asObservable();
    }

    public dataSource$: Observable<PageResponse<T>>;
    public dataValue: PageResponse<T>;

    private pageSize = new BehaviorSubject(50);

    set setPageSize(v: number) {
        this.pageNumber.next(v);
    }

    get getPageSize() {
        return this.pageSize.asObservable();
    }

    public loading = new BehaviorSubject(false);

    constructor(dataSource: PaginatedEndpoint<T, Q>, initialParam: Q) {

        this.param = new BehaviorSubject<Q>(initialParam);

        this.dataSource$ = combineLatest([this.pageNumber, this.pageSize, this.searchValue]).pipe(
            switchMap(([pageNumber, pageSize, searchValue]) => this.param.pipe(
                switchMap((param) => dataSource({ pageNumber: pageNumber + 1, pageSize, searchValue }, param))
            )),
            tap(() => this.loading.next(false))
        );
    }

    connect(): Observable<T[]> {
        return this.dataSource$.pipe(map((page) => {
            this.dataValue = page;
            return page.data
        }));
    }

    fetch(index: number) {
        alert('im in fetch: ' + index)
        this.pageNumber.next(index);
    }

    disconnect(): void {
    }
}
