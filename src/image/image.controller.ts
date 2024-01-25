import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from '../utils/images.utils';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadImageDto } from './dto/create-image.dto';
@Controller('image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload-image')
  @UseGuards(TokenGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data') // Specify the media type
  @ApiBody({
    description: 'Image file', // Description for Swagger
    type: UploadImageDto, // Create a DTO for the file
  })
  uploadImage(@UploadedFile() file) {
    const createImageDto = {
      title: file.filename,
      filename: file.filename,
    };

    return this.imageService.createImage(createImageDto);
  }

  @Get('get-image/:imgpath')
  seeUploadedImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload/files' });
  }
}
