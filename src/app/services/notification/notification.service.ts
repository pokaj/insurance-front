// src/app/services/notification.service.ts
import {Injectable} from '@angular/core';
import Notify from 'simple-notify';

interface NotificationOptions {
  status: 'success' | 'error' | 'warning' | 'info';
  title: string;
  text: string;
  effect?: 'fade' | 'slide';
  showIcon?: boolean;
  showCloseButton?: boolean;
  autoclose?: boolean;
  autoTimeout?: number;
  position?: 'right top' | 'right bottom' | 'left top' | 'left bottom';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  showNotification(options: NotificationOptions): Notify {
    return new Notify({
      status: options.status,
      title: options.title,
      text: options.text,
      effect: options.effect || 'fade',
      speed: 300,
      showIcon: options.showIcon !== false,
      showCloseButton: options.showCloseButton !== false,
      autoclose: options.autoclose !== false,
      autotimeout: options.autoTimeout || 3000,
      type: 'outline',
      position: options.position || 'right top',
    });
  }
}
