import { TWSMessage } from "../../utils/types";

export const FEED_CONNECT = 'FEED_CONNECT';
export const FEED_DISCONNECT = 'FEED_DISCONNECT';
export const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE = 'FEED_WS_CLOSE';
export const FEED_WS_MESSAGE = 'FEED_WS_MESSAGE';
export const FEED_WS_ERROR = 'FEED_WS_ERROR';

type TFeedConnectAction = {
    type: typeof FEED_CONNECT,
    payload: string
}
type TFeedDisconnectAction = {
    type: typeof FEED_DISCONNECT
}
type TFeedConnectingAction = {
    type: typeof FEED_WS_CONNECTING
}
type TFeedErrorAction = {
    type: typeof FEED_WS_ERROR,
    payload: string
}
type TFeedOpenAction = {
    type: typeof FEED_WS_OPEN
}
type TFeedCloseAction = {
    type: typeof FEED_WS_CLOSE
}
type TFeedGetMessageAction = {
    type: typeof FEED_WS_MESSAGE,
    payload: TWSMessage
}

export type TFeedActions =
    | TFeedConnectAction
    | TFeedDisconnectAction
    | TFeedConnectingAction
    | TFeedErrorAction
    | TFeedOpenAction
    | TFeedCloseAction
    | TFeedGetMessageAction;

export const connect = (url: string): TFeedConnectAction => ({
    type: FEED_CONNECT,
    payload: url
});

export const disconnect = (): TFeedDisconnectAction => ({
    type: FEED_DISCONNECT
});
