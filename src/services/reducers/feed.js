import {
    FEED_WS_CLOSE,
    FEED_WS_CONNECTING,
    FEED_WS_ERROR,
    FEED_WS_MESSAGE,
    FEED_WS_OPEN
} from "../action/feed";

const initialState = {
    isLoading: false,
    feedConnected: false,
    connectingError: null,
    orders: [],
    total: null,
    totalToday: null
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_WS_CONNECTING:
            return {
                ...state,
                isLoading: true,
            };
        case FEED_WS_OPEN:
            return {
                ...state,
                isLoading: false,
                feedConnected: true,
            };
        case FEED_WS_CLOSE:
            return {
                ...state,
                feedConnected: false,
            };
        case FEED_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case FEED_WS_MESSAGE:
            return {
                ...state,
                feedConnected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        default:
            return state;
    }
}