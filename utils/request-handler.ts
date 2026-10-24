// utils/request-handler.ts
import type { APIRequestContext } from '@playwright/test';


export class RequestHandler {

    private baseURL: string;
    private apipath: string = '';
    private queryParams: object = {};
    private apiheaders: object = {};
    private apiBody: object = {};

url(url:string){
    this.baseURL = url;
    return this;
}
path(path:string){
    this.apipath = path;
    return this;

}
params(params:object){
    this.queryParams = params;
    return this;

}
headers(headers:object){
    this.apiheaders = headers;
    return this;

}
body(body:object){
    this.apiBody = body;
    return this;

}
}
