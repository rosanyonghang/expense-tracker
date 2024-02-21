import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserExceptionFilter } from '../exception-filters/create-user.exception-filter';
import { ApiBasicAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from '../../../authentication/http/guards/token.guard';
import { DuplicateUserExceptionFilter } from '../exception-filters/duplicate-user.exception-filter';
import { CreateUserRequest } from '../requests/create-user.request';
import { CreateUserCommand } from '../../commands/create-user.command';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../services/user.service';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../../utils/images.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from '../../../image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { CreateRecurringTransactionDto } from '../../../recurring-transaction/dto/create-recurring-transaction.dto';
import { ChangePasswordDto } from '../../../authentication/http/dto/Password.dto';
import { UpdateUserDto } from '../dto/User.dto';
@Controller()
@ApiTags('User')
@ApiBasicAuth()
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
    private readonly commandBus: CommandBus,
  ) {}

  // @UseGuards(TokenGuard)

  @UseFilters(new DuplicateUserExceptionFilter())
  @UseFilters(new CreateUserExceptionFilter())
  @Post('/user')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './upload/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  async createUser(
    @Body() body: CreateUserRequest,
    @UploadedFile() image?: any,
  ) {
    let imageFilename: string | undefined;
    if (image) {
      await this.imageService.createImage({
        title: image,
        filename: image,
      });
    }

    const createUserCommand = new CreateUserCommand({
      ...body,
      img: image ? image.filename : undefined,
    });

    return this.commandBus.execute(createUserCommand);
  }

  @UseGuards(TokenGuard)
  @UseFilters(new DuplicateUserExceptionFilter())
  @UseFilters(new CreateUserExceptionFilter())
  @Get('/user/me')
  async getUser(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get('/user/all')
  @UseGuards(TokenGuard)
  getAllUsers() {
    return this.userService.findAll();
  }

  @Put('user/change-password')
  @UseGuards(TokenGuard)
  @ApiBody({
    isArray: false,
    description: 'Change password API',
    type: ChangePasswordDto,
  })
  changePassword(@Req() req, @Body() data) {
    return this.userService.changePassword(req.user.id, data);
  }

  @Put('user/change-password/:id')
  @UseGuards(TokenGuard)
  changePasswordForUser(@Req() req, @Param('id') id, @Body() data) {
    return this.userService.changePasswordForUser(id, data);
  }

  @Get('/user/:id')
  @UseGuards(TokenGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('/user/:id')
  @UseGuards(TokenGuard)
  @ApiBody({
    isArray: false,
    description: 'Change password API',
    type: UpdateUserDto,
  })
  updateUser(@Param('id') id: string, @Body() data) {
    return this.userService.updateUser(id, data);
  }

  @MessagePattern({ cmd: 'validateToken' })
  validateUser(input?: string) {
    return this.userRepository.findOneOrFail({ where: { id: input } });
  }
}
