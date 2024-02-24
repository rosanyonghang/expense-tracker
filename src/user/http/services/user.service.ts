import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { comparePasswords } from '../../../authentication/http/controllers/authentication.controller';
import { BcryptService } from '../../../authentication/services/bcrypt.service';
import { UserDetail } from '../../../user-detail/entities/user-detail.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcrypt: BcryptService,
  ) {}

  findAll() {
    // return this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoin(
    //     'user_detail',
    //     'user_detail',
    //     '"user".id = "user_detail"."userId"',
    //   )
    //   .select([
    //     'user.id',
    //     'user.email',
    //     'user.prefix',
    //     'user.phone',
    //     'user.googleId',
    //     'user.facebookId',
    //     'user.verified',
    //     'user.firstTime',
    //     'user.status',
    //     'user.role',
    //     'user.userType',
    //     'user_detail.fullname',
    //     'user_detail.img',
    //     'user_detail.openingBalance',
    //     'user_detail.address',
    //     'user_detail.occupation',
    //   ])
    //   .getMany();
    //
    const query = `
         SELECT "user".id, "user".email, "user".prefix, "user".phone, "user"."googleId", "user"."facebookId", "user".verified, "user"."firstTime", 
         "user".status, "user".role, "user"."userType", "user"."createdAt",
        user_detail.fullname, user_detail.img, user_detail."openingBalance", user_detail.address, user_detail.occupation
        FROM "user"
        LEFT JOIN user_detail ON "user".id = user_detail."userId"
    `;

    return this.userRepository.query(query);
  }

  findAllByStatus(status: string) {
    const userStatuses = {
      all: 'ALL',
      active: 'ACTIVE',
      pending: 'PENDING',
      inactive: 'INACTIVE',
      rejected: 'REJECTED',
    };
    if (status === 'all') {
      return this.findAll();
    } else {
      const query = `
         SELECT "user".id, "user".email, "user".prefix, "user".phone, "user"."googleId", "user"."facebookId", "user".verified, "user"."firstTime", 
         "user".status, "user".role, "user"."userType", "user"."createdAt",
        user_detail.fullname, user_detail.img, user_detail."openingBalance", user_detail.address, user_detail.occupation
        FROM "user"
        LEFT JOIN user_detail ON "user".id = user_detail."userId"
        WHERE "user".status = $1
    `;

      return this.userRepository.query(query, [userStatuses[status]]);
    }
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id.toString() } });
  }

  async changePassword(id: number, data) {
    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: id })
      .addSelect('user.password')
      .getOne();
    const areEqual = await comparePasswords(user.password, data.oldPassword);
    if (!areEqual) {
      throw new HttpException(
        'Username or password is incorrect',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      return this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .where('user.id=:id', { id: +id })
        .set({
          password: await this.bcrypt.hashPassword(data.password),
        })
        .execute();
    }
  }

  async changePasswordForUser(id: number, data) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .where('user.id=:id', { id: +id })
      .set({
        password: await this.bcrypt.hashPassword(data.password),
      })
      .execute();
  }

  updateUser(id, data) {
    return this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .where('user.id=:id', { id: +id })
      .set({
        ...data,
      })
      .execute();
  }
}
