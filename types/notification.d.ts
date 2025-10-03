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

export interface NotificationItemProps {
  icon: any; 
  message: string;
  time: string;
  isRead?: boolean;
  onPress?: () => void;
}

export interface NotificationHeaderProps {
  selectedFilter: string;
  onSearch: (text: string) => void;
  onFilterSelect: (filter: string) => void;
}