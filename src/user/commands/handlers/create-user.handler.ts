import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserCommand } from '../create-user.command';
import { UserDetail } from '../../../user-detail/entities/user-detail.entity';
import { User } from '../../entities/user.entity';
import { DuplicateUserException } from '../../exceptions/duplicate-user.exception';
import { BcryptService } from '../../../authentication/services/bcrypt.service';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TokenStorage } from '../../../authentication/storage/token.storage';
import { UserDetailResponse } from '../../../authentication/http/response/user-detail.response';
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    private readonly bcrypt: BcryptService,
    @Inject('TokenStorage')
    private readonly tokenStorage: TokenStorage,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    // Check if email already exists
    if (
      await this.userRepository.findOne({
        where: { email: command.data.email },
      })
    ) {
      throw new DuplicateUserException('Email address already exists');
    }

    // Check if phone number already exists
    if (
      command.data.phone &&
      (await this.userRepository.findOne({
        where: { phone: command.data.phone },
      }))
    ) {
      throw new DuplicateUserException('Phone number already exists');
    }

    const user = this.userRepository.create({
      ...command.data,
      password: await this.bcrypt.hashPassword(command.data.password),
    });

    await this.userRepository.save(user);

    // Create a new UserDetail entity
    const userDetail = await this.userDetailRepository.create({
      fullname: command.data.fullname,
      img: command.data.img,
      openingBalance: command.data.openingBalance,
      address: command.data.address,
      occupation: command.data.occupation,
      user: user,
    });

    const token = await this.tokenStorage.generateToken({
      data: {
        id: user.id,
        email: user.email,
      },
    });

    // Save the UserDetail entity
    await this.userDetailRepository.save(userDetail);

    // Create a new User entity with the UserDetail relation

    return {
      user: new UserDetailResponse({
        ...user,
      }),
      accessToken: token,
      refreshToken: token, // Todo: will implement later
      tokenType: 'bearer',
    };
  }
}
