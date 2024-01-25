import { CoreEntity } from './entities/base.entity';
import { IBaseService } from './IBaseService.service';
import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseService<T extends CoreEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}
  create(entity: T): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.genericRepository
          .save(entity)
          .then((created) => resolve(created.id))
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.genericRepository.delete([id]);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get(id: any): Promise<T> {
    try {
      return this.genericRepository.findOne(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(): Promise<T[]> {
    try {
      return this.genericRepository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  update(entity: any): Promise<T> {
    try {
      return new Promise<any>((resolve, reject) => {
        this.genericRepository
          .findOne(entity.id)
          .then((responseGet) => {
            try {
              if (responseGet == null) reject('Not existing');
              const retrievedEntity: any = responseGet as any;
              this.genericRepository
                .save(retrievedEntity)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            } catch (e) {
              reject(e);
            }
          })
          .catch((err) => reject(err));
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
