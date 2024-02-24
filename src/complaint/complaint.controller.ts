import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';
import { BaseController } from '../base/base.controller';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../core/decorators/response.decorator';

@Controller('complaint')
@ApiTags('Complaint')
export class ComplaintController extends BaseController<Complaint> {
  constructor(private readonly complaintService: ComplaintService) {
    super(complaintService);
  }
  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateComplaintDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('')
  @ApiBearerAuth()
  @ResponseMessage('Record has been successfully created')
  async create(@Body() entity, @Req() req: any) {
    return this.complaintService.create({
      ...entity,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
  }

  @ApiBody({
    isArray: false,
    description: 'Create Result API',
    type: CreateComplaintDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Put('/:id')
  @ApiBearerAuth()
  @ResponseMessage('Record has been successfully updated')
  async update(@Param('id') id: number, @Body() entity, @Req() req: any) {
    return this.complaintService.update({
      ...entity,
      id: +id,
      updatedBy: req.user.id,
    });
  }
}
