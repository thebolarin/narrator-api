import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResearchService } from './research.service';
import { GetProjectDto, PaginationRequestDTO } from './dto/research.dto';

@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Get('project/:projectId')
  async findAll (@Param() params: GetProjectDto, @Query() paginationRequestDTO: PaginationRequestDTO) {
    return this.researchService.findAll(params.projectId, paginationRequestDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateResearchDto: UpdateResearchDto) {
  //   return this.ResearchService.update(+id, updateResearchDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchService.remove(+id);
  }
}
