import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchSchema } from './entities/research.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Research', schema: ResearchSchema }]),
 ],
  controllers: [ResearchController],
  providers: [ResearchService],
})
export class ResearchModule {}
