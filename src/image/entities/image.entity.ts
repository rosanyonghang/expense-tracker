import { CoreEntity } from '../../base/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Image extends CoreEntity {
  @Column()
  title: string;

  @Column()
  filename: string;
}
