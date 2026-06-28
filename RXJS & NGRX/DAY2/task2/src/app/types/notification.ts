export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  createdAt: Date;
}
