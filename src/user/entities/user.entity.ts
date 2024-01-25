import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { StatusEnum } from '../../utils/enums/status.enum';
import { UserTypeEnum } from '../../utils/enums/user-type.enum';
import { Role, UserType } from '../../utils/enums/user.enum';

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
    unique: true,
    nullable: true,
    default: '977',
  })
  readonly prefix: string;

  @Column({
    unique: true,
    nullable: true,
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
    unique: true,
    nullable: true,
  })
  readonly verified: boolean;

  @Column({
    unique: true,
    nullable: true,
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

  @Exclude()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
