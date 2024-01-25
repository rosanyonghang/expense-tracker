import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserDetailsQuery } from '../find-user-details.query';
import { User } from '../../entities/user.entity';

@Injectable()
@QueryHandler(FindUserDetailsQuery)
export class FindUserDetailsHandler
  implements IQueryHandler<FindUserDetailsQuery>
{
  constructor(
    readonly queryBus: QueryBus,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async execute(query: FindUserDetailsQuery) {
    const res = await this.userRepository.query(
      `
      SELECT "user".id, "user".email, "user".prefix, "user".phone, "user"."googleId", "user"."facebookId", "user".verified, "user"."firstTime", "user".status, "user".role, "user"."userType",
      user_detail.fullname, user_detail.img, user_detail."openingBalance", user_detail.address, user_detail.occupation
      FROM "user"
      LEFT JOIN user_detail ON "user".id = user_detail."userId"
      WHERE "user".id = $1
    `,
      [query.userId],
    );

    return res;
  }
}
