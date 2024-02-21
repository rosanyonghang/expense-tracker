import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';

@Injectable()
export class ComplaintService extends BaseService<Complaint> {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
  ) {
    super(complaintRepository);
  }
}
