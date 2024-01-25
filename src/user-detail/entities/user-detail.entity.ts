import { Entity, OneToOne, OneToMany, Column, JoinColumn } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class UserDetail extends CoreEntity {
  @Column({})
  readonly fullname: string;

  @Column({
    nullable: true,
  })
  readonly img: string;

  @Column({
    default: 0,
  })
  readonly openingBalance: number;

  @Column({
    nullable: true,
  })
  readonly address: string;

  @Column({
    nullable: true,
  })
  readonly occupation: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
