import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FindUserDetailsQuery } from '../../../user/queries/find-user-details.query';
import { User } from '../../../user/entities/user.entity';
import { TokenStorage } from '../../storage/token.storage';
import { UserDetailResponse } from '../response/user-detail.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenGuard } from '../guards/token.guard';
import axios from 'axios';

@ApiTags('Authentication')
@Controller()
export class AuthenticationController {
  constructor(
    private jwtService: JwtService,
    private readonly queryBus: QueryBus,
    @Inject('TokenStorage')
    private readonly tokenStorage: TokenStorage,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private _createToken({ data }): any {
    const expiresIn = '15d';

    const user = { data };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/authentication')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  async login(@Request() req: any) {
    const [user, token] = await Promise.all([
      this.queryBus.execute<FindUserDetailsQuery, User>(
        new FindUserDetailsQuery(req.user.id),
      ),
      this.tokenStorage.generateToken(req.user),
    ]);

    if (user.firstTime) {
      await this.userRepository.update(
        {
          id: req.user.id,
        },
        { firstTime: false },
      );
    }

    return {
      user: user[0],
      accessToken: token,
      refreshToken: token, // Todo: will implement later
      tokenType: 'bearer',
    };
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async getUserDetails(@Req() req: any) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('UserDetail', 'details', 'details.userId = user.id')
      .where('user.id = :id', { id: req.user.id })
      .getOneOrFail();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return new UserDetailResponse({
      ...user,
    });
  }

  @Post('google-connect')
  async googleConnect(@Body() body: { token: string }) {
    const res = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${body.token}`,
    );
    const obj = res.data;
  }
}

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
