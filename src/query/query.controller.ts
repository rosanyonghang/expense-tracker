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

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post()
  create(@Body() createQueryDto: CreateQueryDto) {
    return this.queryService.create(createQueryDto);
  }

  @Get()
  @UseGuards(TokenGuard)
  findAll() {
    return this.queryService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  findOne(@Param('id') id: string) {
    return this.queryService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
    return this.queryService.update(+id, updateQueryDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string) {
    return this.queryService.remove(+id);
  }
}
