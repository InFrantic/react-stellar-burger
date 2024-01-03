import { TWSMessage } from "../../utils/types"

export const ORDERS_CONNECT = "ORDERS_CONNECT"
export const ORDERS_DISCONNECT = "ORDERS_DISCONNECT"
export const ORDERS_WS_CONNECTING = "ORDERS_WS_CONNECTING"
export const ORDERS_WS_OPEN = "ORDERS_WS_OPEN"
export const ORDERS_WS_CLOSE = "ORDERS_WS_CLOSE"
export const ORDERS_WS_MESSAGE = "ORDERS_WS_MESSAGE"
export const ORDERS_WS_ERROR = "ORDERS_WS_ERROR"

type TOrdersConnectAction = {
  type: typeof ORDERS_CONNECT,
  payload: string
}
type TOrdersDisconnectAction = {
  type: typeof ORDERS_DISCONNECT
}
type TOrdersConnectingAction = {
  type: typeof ORDERS_WS_CONNECTING
}
type TOrdersErrorAction = {
  type: typeof ORDERS_WS_ERROR,
  payload: string
}
type TOrdersOpenAction = {
  type: typeof ORDERS_WS_OPEN
}
type TOrdersCloseAction = {
  type: typeof ORDERS_WS_CLOSE
}
type TOrdersGetMessageAction = {
  type: typeof ORDERS_WS_MESSAGE,
  payload: TWSMessage
}

export type TOrdersAction =
  | TOrdersConnectAction
  | TOrdersDisconnectAction
  | TOrdersConnectingAction
  | TOrdersErrorAction
  | TOrdersOpenAction
  | TOrdersCloseAction
  | TOrdersGetMessageAction

export const connect = (url: string): TOrdersConnectAction => ({
  type: ORDERS_CONNECT,
  payload: url,
})

export const disconnect = () => ({
  type: ORDERS_DISCONNECT
})