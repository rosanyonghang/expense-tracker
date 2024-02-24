import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { BaseController } from '../base/base.controller';
import { Notification } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';

@Controller('notification')
export class NotificationController extends BaseController<Notification> {
  constructor(
    private readonly notificationGateway: NotificationsGateway,
    private readonly notificationService: NotificationService,
  ) {
    super(notificationService);
  }

  @Get('test')
  async testNotification() {
    this.notificationGateway.server.emit('notification', {
      message: 'Test notification',
      title: 'Expense Tracker',
    });
    return {
      message: 'Test executed',
    };
  }
}
