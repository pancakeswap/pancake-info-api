/// <reference types="node" />
import { ServerResponse, IncomingMessage } from 'http';
export declare type NowRequestCookies = {
    [key: string]: string;
};
export declare type NowRequestQuery = {
    [key: string]: string | string[];
};
export declare type NowRequestBody = any;
export declare type NowRequest = IncomingMessage & {
    query: NowRequestQuery;
    cookies: NowRequestCookies;
    body: NowRequestBody;
};
export declare type NowResponse = ServerResponse & {
    send: (body: any) => NowResponse;
    json: (jsonBody: any) => NowResponse;
    status: (statusCode: number) => NowResponse;
};
