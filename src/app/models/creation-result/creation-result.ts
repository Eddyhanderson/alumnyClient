export class CreationResult<T>{
    succeded: boolean;

    errors: Array<string>;

    messages: Array<string>;

    getUri: string;

    data: T;

    public constructor(data: T) {
        this.data = data;
    }
}