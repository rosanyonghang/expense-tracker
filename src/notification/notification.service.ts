import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {
    super(notificationRepository);
  }
}
