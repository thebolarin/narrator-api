import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<Project>,
  ) { }

  async create(createProjectDto: CreateProjectDto) {
    const projectInfo: any = {
      name: createProjectDto.name,
      description: createProjectDto.description,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const project = new this.projectModel(projectInfo);
    await project.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Project created successfully.",
      data: project
    }
  }

  async findAll() {
    const projects = await this.projectModel.find().sort({ createdAt: -1 }).exec();

    return {
      statusCode: HttpStatus.OK,
      message: 'Projects fetched Successfully!',
      data: projects
    };
  }

  async findOne(projectId: String) {
    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Project not found!',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Project fetched successfully!',
      data: project,
    };
  }

  async update(projectId: String, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Project not found!',
        data: null,
      };
    }

    if (updateProjectDto.name) project.name = updateProjectDto.name
    if (updateProjectDto.description) project.description = updateProjectDto.description

    await project.save()
  }

  async remove(projectId: String) {
    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Project not found!',
        data: null,
      };
    }

    await project.deleteOne()

    return {
      statusCode: HttpStatus.OK,
      message: 'Project deleted successfully!',
    };
  }
}
