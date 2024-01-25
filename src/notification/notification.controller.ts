import {
  Controller,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { BaseController } from "../base/base.controller";
import { Notification } from "./entities/notification.entity";

@Controller('notification')
export class NotificationController extends BaseController<Notification> {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService)
  }
}
