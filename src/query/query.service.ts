import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Repository } from 'typeorm';
import { NotificationsGateway } from '../notification/notifications.gateway';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../utils/enums/notification.enum';

@Injectable()
export class QueryService {
  constructor(
    private readonly notificationGateway: NotificationsGateway,
    @InjectRepository(Query)
    private readonly queryRepository: Repository<Query>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createQueryDto: any) {
    console.log(createQueryDto);
    const query: any = await this.queryRepository
      .createQueryBuilder('query')
      .insert()
      .into(Query)
      .values([createQueryDto])
      .execute();
    this.notificationGateway.server.emit('notification', {
      message: `${createQueryDto.fullname} has sent a new query.`,
      type: 'query',
      title: 'New Query Received',
    });
    await this.notificationService.create({
      title: 'Query Added',
      description: `${query.fullname} has added a new query`,
      referenceId: query.id,
      img: null,
      type: NotificationType.GLOBAL,
    } as any);
    return query;
  }

  findAll() {
    return this.queryRepository.find({});
  }

  findAllByStatus(status: string) {
    const queryStatus = {
      acknowledged: 'ACKNOWLEDGED',
      unacknowledged: 'UNACKNOWLEDGED',
    };
    return this.queryRepository
      .createQueryBuilder('query')
      .where('status = :status', { status: queryStatus[status] })
      .getMany();
  }

  findOne(id: number) {
    return this.queryRepository.findOne({ where: { id } });
  }

  update(id: number, updateQueryDto: any) {
    return this.queryRepository.update(
      {
        id,
      },
      { ...updateQueryDto },
    );
  }

  remove(id: number) {
    return this.queryRepository.delete({ id });
  }
}
