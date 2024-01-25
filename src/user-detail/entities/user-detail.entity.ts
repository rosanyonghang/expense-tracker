import { Entity, OneToOne, OneToMany, Column } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserDetail extends CoreEntity {
  @Column({})
  readonly fullname: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly img: string;

  @Column({
    nullable: true,
    default: 0,
  })
  readonly openingBalance: number;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly address: string;

  @Column({
    unique: true,
    nullable: true,
  })
  readonly occupation: string;

  @OneToOne(() => User)
  userId: User;
}
