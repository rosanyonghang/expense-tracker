import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { NotificationType } from 'src/utils/enums/notification.enum';

@Entity()
export class Notification extends CoreEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly img: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly referenceId: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.GLOBAL,
  })
  type: NotificationType;

  @ManyToOne(() => User)
  user: User;
}
