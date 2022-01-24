export class Response<T>{
    public data: T;

    constructor(data: T) {
        this.data = data;
    }
}
