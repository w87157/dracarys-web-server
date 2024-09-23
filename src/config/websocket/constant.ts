// websocket連線狀態
export enum WsConnectStatusEnum {
  /** 已連線 */
  connection = 'connection',
  /** 連線中 */
  connecting = 'connecting',
  /** 已連線 */
  connected = 'connected',
  /** 中斷連線中 */
  disconnecting = 'disconnecting',
  /** 已中斷連線 */
  disconnect = 'disconnect',
  /** 重新連線 */
  reconnect = 'reconnect',
  /** 客戶端的已連線 */
  connect = 'connect',
}

// websocket消息類型
export enum WsMsgTypeEnum {
  /** 用戶進入聊天 */
  join = 'join',
  /** 用戶進入聊天完成 */
  joined = 'joined',
  /** 用戶進入聊天 */
  otherJoin = 'otherJoin',
  /** 用戶退出聊天 */
  leave = 'leave',
  /** 用戶退出聊天完成 */
  leaved = 'leaved',
  /** 目前所有在線用戶 */
  liveUser = 'liveUser',
  /** 用戶傳送消息 */
  message = 'message',
  /** 房間正在直播 */
  roomLiveing = 'roomLiveing',
  /** 房間不在直播 */
  roomNoLive = 'roomNoLive',
  /** sendBlob */
  sendBlob = 'sendBlob',
  offer = 'offer',
  answer = 'answer',
  candidate = 'candidate',
}
