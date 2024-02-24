import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { NotificationsGateway } from '../notification/notifications.gateway';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Query, Notification])],
  controllers: [QueryController],
  providers: [QueryService, NotificationsGateway, NotificationService],
})
export class QueryModule {}
