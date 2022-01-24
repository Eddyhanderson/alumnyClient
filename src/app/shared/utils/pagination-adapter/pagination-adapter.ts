import { filter } from 'lodash';
import { BehaviorSubject, Observable, PartialObserver, Subscribable, Subscription, Unsubscribable } from 'rxjs';

import { combineLatest } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';

export type PaginatedEndpoint<T, Q> = (query: PaginationQuery, param?: Q) => Observable<PageResponse<T>>;

export class PaginationAdapter<T, Q> implements Subscribable<T> {

    private param: BehaviorSubject<Q>;

    set setParam(param: Partial<Q>) {
        const lastParam = this.param.getValue();
        const nextParam = { ...lastParam, ...param }

        this.param.next(nextParam);
    }

    get getParam(): Observable<Q> {
        return this.param.asObservable();
    }

    private pageNumber = new BehaviorSubject(1);

    public nextPage() {
        let lastNumber = this.pageNumber.getValue();
        this.pageNumber.next(++lastNumber);
    }

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

    private dataSource$: Observable<T[]>;

    get getDataSource() {
        return this.dataSource$;
    }

    private pageSize = new BehaviorSubject(10);

    set setPageSize(v: number) {
        this.pageSize.next(v);
    }

    get getPageSize() {
        return this.pageSize.asObservable();
    }

    sort(key: keyof T, mode: "asc" | "desc") {
        this.dataSource$.pipe(map(d => {
            d.sort((a, b) => {
                const propA = a[key]
                const propB = b[key]
                let result
                if (typeof propA === 'string') {
                    result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase())
                } else {
                    result = propA as any - (propB as any)
                }
                const factor = mode == 'asc' ? 1 : -1
                return result * factor
            })
        }))
    }

    public hasMore = new BehaviorSubject(true);

    public loading: boolean = false;

    public totalElements: number;

    constructor(dataSource: PaginatedEndpoint<T, Q>, initialParam: Q) {
        this.param = new BehaviorSubject<Q>(initialParam);

        this.dataSource$ = combineLatest([this.pageNumber, this.pageSize, this.searchValue]).pipe(
            switchMap(([pageNumber, pageSize, searchValue]) => this.param.pipe(
                tap(() => this.loading = true),
                switchMap((param) => dataSource({ pageNumber, pageSize, searchValue }, param))
            )),
            map((pageResponse) => { this.totalElements = pageResponse.totalElements; return pageResponse.data }),
            scan((acc, data) => {
                if (data != null && data.length == 0)
                    this.hasMore.next(false);
                
                var accFiltered = (acc as [any]).filter((value) => {
                    (data as [any]).find((d) => d.id == value.id) === null
                })

                return [...accFiltered, ...data]
            }, []),            
            tap(() => this.loading = false)
        );
    }

    subscribe(observer?: PartialObserver<any>): Unsubscribable;
    subscribe(next: null, error: null, complete: () => void): Unsubscribable;
    subscribe(next: null, error: (error: any) => void, complete?: () => void): Unsubscribable;
    subscribe(next: (value: any) => void, error: null, complete: () => void): Unsubscribable;
    subscribe(next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
    subscribe(next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable
    subscribe(observer?: PartialObserver<any> | null | undefined | ((value: any) => void), error?: null | undefined | ((error: any) => void), complete?: () => void): Unsubscribable {
        return this.dataSource$.subscribe(...arguments);
    }

    public loadMore() {
        if (this.hasMore.getValue())
            this.nextPage();

    }
}
