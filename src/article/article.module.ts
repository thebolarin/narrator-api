import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { NewsAPIService } from '../commons/services/news.service';
import { ProjectSchema } from '../project/entities/project.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAPIService } from '../commons/services/openapi.service';
import { ArticleSchema } from './entities/article.entity';
import { ResearchSchema } from '../research/entities/research.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Research', schema: ResearchSchema }]),
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
 ],
  controllers: [ArticleController],
  providers: [ArticleService, NewsAPIService, OpenAPIService],
})
export class ArticleModule {}
