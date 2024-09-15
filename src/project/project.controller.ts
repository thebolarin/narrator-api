import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, GetProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  findOne(@Param() params: GetProjectDto) {
    return this.projectService.findOne(params.projectId);
  }

  @Put(':projectId')
  update(@Param() params: GetProjectDto, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(params.projectId, updateProjectDto);
  }

  @Delete(':projectId')
  remove(@Param() params: GetProjectDto) {
    return this.projectService.remove(params.projectId);
  }
}
