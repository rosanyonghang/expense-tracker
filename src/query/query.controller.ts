import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { TokenGuard } from '../authentication/http/guards/token.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../core/decorators/response.decorator';

@Controller('query')
@ApiTags('Query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateQueryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  @ResponseMessage('Record has been successfully created')
  create(@Body() createQueryDto: any) {
    return this.queryService.create(createQueryDto);
  }

  @Get()
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  findAll() {
    return this.queryService.findAll();
  }

  @Get('/status/:status')
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  findAllByStatus(@Param('status') status: string) {
    return this.queryService.findAllByStatus(status);
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.queryService.findOne(+id);
  }

  @ApiBody({
    isArray: false,
    description: 'Update Result API',
    type: CreateQueryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put(':id')
  @ApiBearerAuth()
  @ResponseMessage('Record has been successfully updated')
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
    return this.queryService.update(+id, updateQueryDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.queryService.remove(+id);
  }
}
