import { TWSMessage } from "../../utils/types";

export const FEED_CONNECT: 'FEED_CONNECT' = 'FEED_CONNECT';
export const FEED_DISCONNECT: 'FEED_DISCONNECT' = 'FEED_DISCONNECT';
export const FEED_WS_CONNECTING: 'FEED_WS_CONNECTING' = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN: 'FEED_WS_OPEN' = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_WS_MESSAGE: 'FEED_WS_MESSAGE' = 'FEED_WS_MESSAGE';
export const FEED_WS_ERROR: 'FEED_WS_ERROR' = 'FEED_WS_ERROR';

export interface IFeedConnectAction{
    readonly type: typeof FEED_CONNECT;
    readonly payload: string;
}
export interface IFeedDisconnectAction {
    readonly type: typeof FEED_DISCONNECT;
    readonly payload: string;
}
export interface IFeedConnectingAction {
    readonly type: typeof FEED_WS_CONNECTING;
}
export interface IFeedErrorAction {
    readonly type: typeof FEED_WS_ERROR;
    readonly payload: string;
}
export interface IFeedOpenAction {
    readonly type: typeof FEED_WS_OPEN;
}
export interface IFeedCloseAction {
    readonly type: typeof FEED_WS_CLOSE;
}
export interface IFeedGetMessageAction {
    readonly type: typeof FEED_WS_MESSAGE;
    readonly payload: TWSMessage;
}

export type TFeedActions = 
| IFeedConnectAction
| IFeedDisconnectAction
| IFeedConnectingAction
| IFeedErrorAction
| IFeedOpenAction
| IFeedCloseAction
| IFeedGetMessageAction;

export const connect = (url: string): IFeedConnectAction => ({
    type: FEED_CONNECT,
    payload: url
});

export const disconnect = (url: string): IFeedDisconnectAction  => ({
    type: FEED_DISCONNECT,
    payload: url
});
