import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StatusEnum } from '../../utils/enums/status.enum';
import { UserTypeEnum } from '../../utils/enums/user-type.enum';
import { Role, UserType } from '../../utils/enums/user.enum';
import { UserDetail } from '../../user-detail/entities/user-detail.entity';

@Entity()
export class User {
  constructor(props?: Partial<User>) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  readonly email: string;

  @Column({
    nullable: true,
    default: '977',
  })
  readonly prefix: string;

  @Column({
    unique: true,
  })
  readonly phone: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly googleId: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly facebookId: string;

  @Exclude()
  @Column({
    nullable: true,
    select: false,
  })
  readonly password: string;

  @Column({
    nullable: true,
    default: false,
  })
  readonly verified: boolean;

  @Column({
    nullable: true,
    default: true,
  })
  readonly firstTime: boolean;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.INACTIVE,
  })
  status: StatusEnum;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.DEFAULT,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  userType: UserType;
  //
  // @OneToOne(() => UserDetail, (details) => details.user, { cascade: true })
  // details: UserDetail;

  @Exclude()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
