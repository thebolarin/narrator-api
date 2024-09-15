import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, FetchArticleDto, GenerateNarrativeAnalysisDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/analyze')
  generateNarrativeAnalysis(@Body() generateNarrativeAnalysisDto: GenerateNarrativeAnalysisDto) {
    return this.articleService.generateNarrativeAnalysis(generateNarrativeAnalysisDto);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get('/list')
  async fetchArticles(@Query() fetchArticleDto: FetchArticleDto) {
    return this.articleService.fetchArticles(fetchArticleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
