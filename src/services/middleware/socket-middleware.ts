import { Middleware, MiddlewareAPI } from "redux";
import { TwsActions } from "../../utils/types";

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
                isConnected = true;
                dispatch({ type: wsConnecting });
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                    dispatch({ type: wsConnect });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.close = () => {
                    dispatch({type: onClose});
                  };

                if (wsSendMessage && type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                }
            }

            next(action);
        };
    };
};