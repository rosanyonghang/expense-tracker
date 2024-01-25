import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { BcryptService } from '../authentication/services/bcrypt.service';
import { UserController } from './http/controllers/user.controller';
import { FindUserDetailsHandler } from './queries/handlers/find-user-details.handler';
import { UserService } from './http/services/user.service';
import { UserDetail } from '../user-detail/entities/user-detail.entity';
import { ImageService } from '../image/image.service';
import { ImageModule } from '../image/image.module';
import { Image } from '../image/entities/image.entity';
import { TokenStorageProvider } from '../authentication/providers/token-storage.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    ImageModule,
    TypeOrmModule.forFeature([User, UserDetail, Image]),
  ],
  controllers: [UserController],
  providers: [
    TokenStorageProvider,
    JwtService,
    FindUserDetailsHandler,
    CreateUserHandler,
    BcryptService,
    UserService,
    ImageService,
  ],
})
export class UserModule {}
