import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../base/entities/base.entity';
@Entity()
export class DefaultSetting extends CoreEntity {
  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  value: string;

  @Column({
    nullable: false,
  })
  code: string;
}
