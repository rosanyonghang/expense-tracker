import { Entity, Column, DeleteDateColumn } from 'typeorm';
import { AcknowledgementStatus } from '../../utils/enums/status.enum';
import { CoreEntity } from '../../base/entities/base.entity';

@Entity()
export class Complaint extends CoreEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: AcknowledgementStatus,
    default: AcknowledgementStatus.ACKNOWLEDGED,
  })
  status: AcknowledgementStatus;
}
