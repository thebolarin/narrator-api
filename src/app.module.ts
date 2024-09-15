import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './app.config';
import { ArticleModule } from './article/article.module';
import { ResearchModule } from './research/research.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: AppConfig.DATABASE_URI })}),
    ProjectModule,
    ArticleModule,
    ResearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
