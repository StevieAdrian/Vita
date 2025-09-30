export interface Notification {
  id?: string;
  toUid: string;
  fromUid?: string;
  type: NotificationType;
  message: string;
  createdAt: any;
  read: boolean;
  extraData?: Record<string, any>;
}
