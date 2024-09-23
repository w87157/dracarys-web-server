// import {
//   LiveRoomIsShowEnum,
//   LiveRoomStatusEnum,
// } from '@/types/ILiveRoom';

export interface IVisitorLog {
  id?: number;
  live_room_id?: number;
  user_id?: number;
  ip?: string;
  user_agent?: string;
  duration?: number;
  /** 獲取一段時間內，每個ip訪問的次數的時候增加的 */
  total?: number;
  /** /visitor_log/create接口的時候增加的 */
  tourist?: {
    info: IUser;
    token: string;
    token_exp: number;
  };

  user?: IUser;

  /** 統計字段 */
  analysis_format_date?: string;
  /** 統計字段 */
  analysis_unique_ip_nums?: number;
  /** 統計字段 */
  analysis_ip_nums?: number;
  /** 統計字段 */
  analysis_unique_user_id_nums?: number;
  /** 統計字段 */
  analysis_user_id_nums?: number;
  /** 統計字段 */
  analysis_average_duration?: number;

  group_user_id?: number;
  parent_user_id?: number;
  parent_user_username?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IQiniuData {
  id?: number;
  user_id?: number;
  prefix?: string;
  bucket?: string;
  qiniu_key?: string;
  qiniu_hash?: string;
  qiniu_fsize?: number;
  qiniu_mimeType?: string;
  qiniu_putTime?: string;
  qiniu_type?: number;
  qiniu_status?: number;
  qiniu_md5?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ISigninStatistics {
  id?: number;
  user_id?: number;
  live_room_id?: number;
  /** 當前連續簽到次數 */
  nums?: number;
  /** 歷史最高連續簽到次數 */
  max_nums?: number;
  /** 累計簽到次數 */
  sum_nums?: number;
  /** 上次簽到日期 */
  recently_signin_time?: string;

  /** 用戶信息 */
  username?: string;
  user?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ISigninRecord {
  id?: number;
  user_id?: number;
  live_room_id?: number;

  /** 用戶信息 */
  username?: string;
  user?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IInitUser extends IUser {
  user_roles: number[];
  live_room: ILiveRoom & {
    devFFmpeg: boolean;
    prodFFmpeg: boolean;
    area: number[];
    devFFmpegLocalFile: string;
    prodFFmpegLocalFile: string;
  };
}

export enum liveEnum {
  srs = 1,
  webrtc,
}

export enum PayStatusEnum {
  wait = 'billd_status_wait',
  timeout = 'billd_status_timeout',
  /** （交易創建，等待買家付款） */
  WAIT_BUYER_PAY = 'WAIT_BUYER_PAY',
  /** （交易支付成功） */
  TRADE_SUCCESS = 'TRADE_SUCCESS',
  /** （未付款交易超時關閉，或支付完成後全額退款） */
  TRADE_CLOSED = 'TRADE_CLOSED',
  /** （交易結束，不可退款） */
  TRADE_FINISHED = 'TRADE_FINISHED',
}

export enum GoodsTypeEnum {
  support = 'support',
  sponsors = 'sponsors',
  gift = 'gift',
  recharge = 'recharge',
}

export enum DanmuMsgTypeEnum {
  danmu,
  otherJoin,
  userLeaved,
  system,
  redbag,
}

export enum WsMessageMsgIsFileEnum {
  yes,
  no,
}

export enum WsMessageMsgIsShowEnum {
  yes,
  no,
}

export enum WsMessageMsgIsVerifyEnum {
  yes,
  no,
}

export interface IWsMessage {
  id?: number;
  username?: string;
  origin_username?: string;
  content?: string;
  origin_content?: string;
  redbag_send_id?: number;
  live_room_id?: number;
  user_id?: number;
  ip?: string;
  msg_is_file?: WsMessageMsgIsFileEnum;
  msg_type?: DanmuMsgTypeEnum;
  user_agent?: string;
  send_msg_time?: number;
  is_show?: WsMessageMsgIsShowEnum;
  is_verify?: WsMessageMsgIsVerifyEnum;

  user?: IUser;
  redbag_send?: IRedbagSend;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRedbagSend {
  id?: number;

  user_id?: number;
  live_room_id?: number;

  total_amount?: string;
  remaining_amount?: string;
  total_nums?: number;
  remaining_nums?: number;
  remark?: string;

  /** 用戶信息 */
  user?: IUser;
  /** 直播房間信息 */
  live_room?: IGoods;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum RedbagIsGrantEnum {
  yes,
  no,
}

export interface IRedbagRecv {
  id?: number;

  user_id?: number;
  redbag_send_id?: number;
  amount?: string;
  remark?: string;

  /** 搶到紅包了，是否已發放 */
  is_grant?: RedbagIsGrantEnum;

  /** 用戶信息 */
  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IWallet {
  id?: number;
  user_id?: number;
  balance?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum WalletRecordEnum {
  reward,
  recharge,
  signin,
}

export enum WalletRecordAmountStatusEnum {
  add,
  del,
}

export interface IWalletRecord {
  id?: number;
  user_id?: number;
  order_id?: number;
  type?: WalletRecordEnum;
  name?: string;
  amount?: number;
  amount_status?: WalletRecordAmountStatusEnum;
  remark?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILiveRoom {
  id?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间名字 */
  roomName?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  status?: number;
  avatar?: string;
  desc?: string;
  token?: string;
  user_roles?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  qq_users?: IQqUser[];
  wallet?: IWallet;
  live_room?: ILiveRoom;
}

export interface IQqUser {
  id?: number;
  client_id?: number;
  openid?: string;
  unionid?: string;
  nickname?: string;
  figureurl?: string;
  figureurl_1?: string;
  figureurl_2?: string;
  figureurl_qq_1?: string;
  figureurl_qq_2?: string;
  constellation?: string;
  gender?: string;
  city?: string;
  province?: string;
  year?: string;
  ret?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILiveUser {
  // id: string;
  // rooms?: string[];
  // userInfo?: IUser;
  created_at: string;
  value: {
    socketId: string;
    joinRoomId: number;
    userInfo?: IUser;
  };
}

export interface IAreaLiveRoom {
  id?: number;
  area_id?: number;
  live_room_id?: number;
  /** 分區信息 */
  area?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IUserLiveRoom {
  id?: number;
  user_id?: number;
  live_room_id?: number;
  /** 用戶信息 */
  user?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum FormTypeEnum {
  'input' = 'input',
  'password' = 'password',
  'number' = 'number',
  'select' = 'select',
  'radio' = 'radio',
  'checkbox' = 'checkbox',
  'markdown' = 'markdown',
  'switch' = 'switch',
  'upload' = 'upload',
  'treeSelect' = 'treeSelect',
  'datePicker' = 'datePicker',
}

export interface ILiveConfig {
  id?: number;
  key?: string;
  value?: string;
  desc?: string;
  type?: FormTypeEnum;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IGoods {
  id?: number;
  type?: GoodsTypeEnum;
  name?: string;
  desc?: string;
  short_desc?: string;
  cover?: string;
  price?: number;
  original_price?: number;
  nums?: number;
  badge?: string;
  badge_bg?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum GiftRecordIsRecvEnum {
  yew,
  no,
}

export enum GiftRecordStatusEnum {
  ok,
  balanceError,
}

export interface IGiftRecord {
  id?: number;
  is_recv?: GiftRecordIsRecvEnum;
  goods_id?: number;
  goods_nums?: number;
  goods_snapshot?: string;
  order_id?: number;
  live_room_id?: number;
  send_user_id?: number;
  recv_user_id?: number;
  status?: GiftRecordStatusEnum;
  remark?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IOrder {
  id?: number;
  /** 用戶信息 */
  user?: IUser;
  /** 商品信息 */
  goods?: IGoods;
  /** 直播房間信息 */
  live_room?: IGoods;

  billd_live_user_id?: number;
  billd_live_goods_id?: number;
  billd_live_live_room_id?: number;
  billd_live_order_subject?: string;
  /** 判斷冪等 */
  billd_live_order_version?: number;
  client_ip?: string;

  product_code?: string;
  qr_code?: string;
  /** 買家支付寶賬號 */
  buyer_logon_id?: string;
  /** 買家實付金額，單位為元，兩位小數。 */
  buyer_pay_amount?: string;
  /** 買家在支付寶的用戶id */
  buyer_user_id?: string;
  /** 交易的訂單金額，單位為元，兩位小數。該參數的值為支付時傳入的total_amount */
  total_amount?: string;
  /** 交易中用戶支付的可開具發票的金額，單位為元，兩位小數。 */
  invoice_amount?: string;
  /** 積分支付的金額，單位為元，兩位小數。 */
  point_amount?: string;
  /** 實收金額，單位為元，兩位小數。該金額為本筆交易，商戶賬戶能夠實際收到的金額 */
  receipt_amount?: string;
  /** 支付寶交易號 */
  trade_no?: string;
  /** 商家訂單號 */
  out_trade_no?: string;
  /** 交易狀態：WAIT_BUYER_PAY（交易創建，等待買家付款）、TRADE_CLOSED（未付款交易超時關閉，或支付完成後全額退款）、TRADE_SUCCESS（交易支付成功）、TRADE_FINISHED（交易結束，不可退款） */
  trade_status?: PayStatusEnum;
  /** 本次交易打款給賣家的時間 */
  send_pay_date?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ISrsPublishStream {
  /** 客戶端在獲取信息時，必須檢查ServerID是否改變，改變時就是服務器重啟，之前所有的資料都應該作廢了。 */
  srs_server_id?: string;
  srs_service_id?: string;
  srs_action?: string;
  srs_client_id?: string;
  srs_ip?: string;
  srs_vhost?: string;
  srs_app?: string;
  srs_tcUrl?: string;
  srs_stream?: string;
  srs_param?: string;
  srs_stream_url?: string;
  srs_stream_id?: string;
  /** 是否是騰訊云云直播，1是，2否 */
  is_tencentcloud_css?: number;
  /** 標識id */
  flag_id?: string;
}

export interface IShopProduct {
  id: number;
  product_name?: string;
  product_desc?: string;
  price?: number;
  category?: string;
  image?: string;
  onshelf_status?: string;
}

export interface IShopDiamond {
  id?: number;
  d_name?: string;
  d_amount?: number;
  price?: number;
}
export interface IShoppingCart {
  id?: number;
  fk_player_account?: string;
}

export interface IShoppingCartItems {
  id?: number;
  fk_cart_id?: number;
  fk_product_id?: number;
  quantity?: number;
}

export interface IShopPayment {
  id?: string;
  fk_order_id?: number;
  payment_method?: string;
  isSuccess?: boolean;
  paid_at?: Date;
  coupon_used?: boolean;
  fk_coupon_id?: number;
}

export interface IShopOrderDetail {
  id?: number;
  fk_player_account?: string;
  fk_order_id?: string;
  fk_product_id?: number;
  quantity?: number;
}

export interface IShopDiamondOrderDetail {
  id?: number;
  fk_order_id?: string;
  fk_product_id?: number;
  quantity?: number;
  price?: number;
}

export interface IShopMyOrder {
  id?: string;
  fk_player_account?: string;
  amount?: number;
  status?: string;
  payment_status?: string;
}

export interface IShopMyDiamondOrder {
  id?: string;
  fk_player_account?: string;
  amount?: number;
  status?: string;
}

export interface IShopItems {
  id?: number;
  item_name?: string;
  item_desc?: string;
  image?: string;
  fk_product_id?: number;
}

export interface IShopMyFavorite {
  id?: number;
  fk_player_account?: string;
  fk_product_id: number;
}

export interface IForum {
  id?: number;
  Player_id?: number;
  area?: string;
  category: string;
  article_title?: string;
  article?: string;
  image?: string;
  figcaption?: string;
  submit_time?: Date;
}

export interface IForumContent {
  id?: number;
  Player_id?: number;
  area?: string;
  category?: string;
  article_title?: string;
  article?: string;
  image?: string;
  figcaption?: string;
}

export interface IForumList {
  image?: string;
  article_title?: string;
  description?: string;
}

export interface IForumNews {
  id?: number;
  admin_id?: number;
  area?: string;
  category?: string;
  article_title?: string;
  article?: string;
  image?: string;
}

export interface IForumTop {
  image?: string;
  area?: string;
  category?: string;
  article_title?: string;
  description?: string;
}
export interface IArtworkType {
  user_account?: string;
  artwork_id?: number;
}
export interface IArtwork {
  id?: number;
  title?: string;
  desc?: string;
  img?: string;
  view_count?: number;
  download_count?: number;
  like_count?: number;
  vote_count?: number;
  artwork_type_id?: number;
  user_account?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface ILive extends ISrsPublishStream {
//   id?: number;
//   /** 用戶信息 */
//   user?: IUser;
//   /** 直播房間信息 */
//   live_room?: ILiveRoom;

//   socket_id?: string;
//   user_id?: number;
//   live_room_id?: number;
//   live_room_is_show?: LiveRoomIsShowEnum;
//   live_room_status?: LiveRoomStatusEnum;
//   /** 1開啟;2關閉 */
//   track_video?: number;
//   /** 1開啟;2關閉 */
//   track_audio?: number;

//   created_at?: string;
//   updated_at?: string;
//   deleted_at?: string;
// }

export interface ILivePlay extends ISrsPublishStream {
  id?: number;

  /** 用戶信息 */
  user?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;

  random_id?: string;
  user_id?: number;
  live_room_id?: number;
  end_time?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILiveRecord {
  id?: number;

  /** 用戶信息 */
  user?: IUser;
  /** 直播房間信息 */
  live_room?: ILiveRoom;

  client_id?: string;
  user_id?: number;
  live_room_id?: number;
  /** 直播時長 */
  duration?: number;
  /** 彈幕數 */
  danmu?: number;
  /** 觀看數 */
  view?: number;
  /** 直播結束時間 */
  end_time?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IBlacklist {
  id?: number;
  ip?: string;
  user_id?: number;
  type?: number;
  msg?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IEmail {
  id?: number;
  email?: string;
  code?: string;
  exp?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ILog {
  id?: number;
  user_id?: number;
  api_user_agent?: string;
  api_duration?: number;
  api_forwarded_for?: string;
  api_referer?: string;
  api_real_ip?: string;
  api_host?: string;
  api_hostname?: string;
  api_method?: string;
  api_path?: string;
  api_query?: string;
  api_body?: string;
  api_status_code?: number;
  api_error?: string;
  api_err_msg?: string;
  api_err_code?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

// export interface ILive {
//   id?: number;
//   socketId?: string;
//   roomId?: string;
//   data?: string;
//   created_at?: string;
//   updated_at?: string;
//   deleted_at?: string;
// }

export interface ILive {
  id?: number;
  /** 1:系统直播;2:用户直播 */
  system?: number;
  /** 用户信息 */
  user?: IUser;
  /** 直播间信息 */
  live_room?: ILiveRoom;
  socketId?: string;
  user_id?: number;
  roomId?: string;
  track_video?: boolean;
  track_audio?: boolean;
  coverImg?: string;
  data?: string;
  streamurl?: string;
  flvurl?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRole {
  id?: number;
  p_id?: number;
  role_name?: string;
  role_value?: string;
  type?: number;
  priority?: number;
  role_auths?: number[];
  c_roles?: number[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
export interface IRoleAuth {
  id?: number;
  role_id?: number;
  auth_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type IList<T> = {
  nowPage?: string;
  pageSize?: string;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: string;
  rangTimeEnd?: string;
} & T;

export interface IUserRole {
  id?: number;
  user_id: number;
  role_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IDayData {
  id?: number;
  day: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IHourData {
  id?: number;
  hour: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IMinuteData {
  id?: number;
  minute: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
