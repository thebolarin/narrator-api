import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginationRequestDTO } from './dto/research.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Research } from './interfaces/research.interface';
import { Model } from 'mongoose';

@Injectable()
export class ResearchService {
  constructor(
    @InjectModel('Research')
    private readonly researchModel: Model<Research>,
  ){
    
  }
  // create(createResearchDto: CreateResearchDto) {
  //   return 'This action adds a new Research';
  // }

  async findAll(projectId: string, paginationRequestDTO: PaginationRequestDTO) {
    const { page, size, sortBy, sortOrder } = paginationRequestDTO;

    const validSortOrder = sortOrder.toUpperCase() === 'DESC' ? -1 : 1;
    const totalCount = await this.researchModel.countDocuments({ project: projectId }).exec();

    if (totalCount === 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'No Research found',
        data: {
          hasNextRecord: false,
          totalCount,
          size,
          page,
          results: []
        }
      };
    }

    const researchs = await this.researchModel.find({ project: projectId })
      .sort({ [sortBy]: validSortOrder } as any)
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const hasNextRecord = (page * size) < totalCount;

    return {
      statusCode: HttpStatus.OK,
      message: 'Project Research fetched Successfully!',
      data: {
        hasNextRecord,
        totalCount,
        size,
        page,
        researchs
      }
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} Research`;
  }

  // update(id: number, updateResearchDto: UpdateResearchDto) {
  //   return `This action updates a #${id} Research`;
  // }

  remove(id: number) {
    return `This action removes a #${id} Research`;
  }
}
