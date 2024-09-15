import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto, FetchArticleDto, GenerateNarrativeAnalysisDto } from './dto/article.dto';
import { NewsAPIService } from 'src/commons/services/news.service';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/project/interfaces/project.interface';
import { Model } from 'mongoose';
import axios from "axios";
import cheerio from "cheerio"
import { OpenAPIService } from '../commons/services/openapi.service';
import { Article } from './interfaces/article.interface';
import { Research } from '../research/interfaces/research.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('Research') private readonly researchModel: Model<Research>,
    public newsAPIService: NewsAPIService,
    public openAPIService: OpenAPIService
  ) { }

  async generateNarrativeAnalysis(generateNarrativeAnalysisDto: GenerateNarrativeAnalysisDto) {
    const { projectId, researchQuestion, articles } = generateNarrativeAnalysisDto
    const input = `${researchQuestion}-${articles.length}`
    const base64Encoded = Buffer.from(input).toString('base64')
    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Project not found!',
        data: null,
      };
    }

    const researchExists = await this.researchModel.findOne({ project: project._id, uniqueId: base64Encoded })

    if (researchExists) {
      const exisitngArticles = await this.articleModel.find({ project: project._id, research: researchExists._id })

      return {
        statusCode: HttpStatus.OK,
        message: 'Narrative Analysis fetched successfully!',
        data: {
          articles: exisitngArticles,
          conclusion: researchExists.conclusion,
          statistics: researchExists.statistics,
          researchQuestion: researchExists.text
        },
      }
    }

    const researchInfo = {
      project: project._id,
      text: researchQuestion,
      startDate: "2024-01-01",
      endDate: "2024-02-02",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const research = new this.researchModel(researchInfo);
    await research.save();

    const narrativeResult = await this.openAPIService.generateNarrativeAnalysis({ researchQuestion, articles })
    const bulkArticles = articles.map(item => {
      const analysis = narrativeResult.articleAnalysis.find(a => a.UniqueId === item.uniqueId);
      let extraItems
      if (analysis) {
        extraItems = {
          narratives: analysis.Narratives,
          dominance: analysis.Dominance,
          evolution: analysis.Evolution,
          research: research._id,
          project: project._id
        }
      }
      return new this.articleModel({ ...item, ...extraItems })
    });
    
    const savedArticles = await this.articleModel.insertMany(bulkArticles)
    research.conclusion = narrativeResult.overallConclusion;
    research.statistics = narrativeResult.statistics;
    research.uniqueId = base64Encoded;
    await research.save()

    return {
      statusCode: HttpStatus.OK,
      message: 'Narrative Analysis fetched successfully!',
      data: {
        articles: savedArticles,
        conclusion: narrativeResult.overallConclusion,
        statistics: narrativeResult.statistics
      },
    };
  }

  async fetchArticles(fetchArticleDto: FetchArticleDto) {
    const { projectId, researchQuestion, researchEndDate, researchStartDate } = fetchArticleDto

    // const project = await this.projectModel.findById(projectId).exec();

    // if (!project) {
    //   return {
    //     statusCode: HttpStatus.NOT_FOUND,
    //     message: 'Project not found!',
    //     data: null,
    //   };
    // }
    const result = await this.openAPIService.extractKeyword(researchQuestion)
    const parsedKeyword = JSON.parse(result)
    console.log(parsedKeyword.keyword, 'here')

    const { articles } = await this.newsAPIService.getArticles({
      keyword: parsedKeyword.keyword,
      // researchStartDate: "2024-06-31",
      // researchEndDate: "2024-08-01"
    })
    console.log(articles)

    if(!articles.length){
      return {
        statusCode: HttpStatus.OK,
        message: 'Articles not found',
        data: [],
      };
    }

    const refactoredArticles = await this.scrapeNews(articles)

    const timestamp = Date.now();

    const bulkArticles = refactoredArticles.map((article, index) => {
      return {
        uniqueId: `${timestamp}-${index}`,//project._id,
        title: article.title,
        author: article.author,
        datePublished: new Date(article.publishedAt),
        url: article.url,
        description: article.description,
        source: article.source,
        summary: article.content,
      }
    })
console.log(`bullkArti`)
    return {
      statusCode: HttpStatus.OK,
      message: 'Articles fetched successfully!',
      data: bulkArticles,
    };

    //todo send each article in a distinct format to GPT-4 llm model to do it's work on the narrative, dominance and evolution
    //todo the llm should pick first 10 
    //todo save the result in your DB 
    //todo generate figures for domiance and evolution chart
    //todo return to the client 

  }


  // Define your research text


  // // Load the tokenizer and model
  // async loadModel() {
  //     const tokenizer = await AutoTokenizer.from_pretrained('dbmdz/bert-large-cased-finetuned-conll03-english');
  //     const model = await AutoModelForTokenClassification.from_pretrained('dbmdz/bert-large-cased-finetuned-conll03-english');

  //     return { tokenizer, model };
  // }



  async create(createArticleDto: CreateArticleDto) {
    const { projectId, researchQuestion, inclusionCriteria, exclusionCriteria, researchEndDate, researchStartDate } = createArticleDto
    console.log(inclusionCriteria)
    // return 'This action adds a new article';
    //todo  get the projectId, inclusion words, exclusion criteria
    // const response = await this.openAPIService.extractKeyword(researchQuestion)
    // const parsedResponse = JSON.parse(response)
    // console.log(parsedResponse, 'hello')
    // const queryString = parsedResponse['keywords'].map(keyword => `+"${keyword}"`).join(' ');
    // console.log(queryString)
    // console.log(queryString)
    // // Encode the query string for use in a URL
    // const encodedQuery = encodeURIComponent(queryString);
    //     return{
    //       keywords:queryString
    //     }

    // const project = await this.projectModel.findById(projectId).exec();

    // if (!project) {
    //   return {
    //     statusCode: HttpStatus.NOT_FOUND,
    //     message: 'Project not found!',
    //     data: null,
    //   };
    // }

    //todo fetch the articles  from news api
    const { articles } = await this.newsAPIService.getArticles({
      inclusionCriteria: "bitcoin",
      researchStartDate: "2024-06-31",
      researchEndDate: "2024-08-01"
    })
    console.log(articles)

    const refactoredArticles = await this.scrapeNews(articles)

    // const fetchArticles = await this.newsAPIService.fetchArticles()
    // console.log(fetchArticles)

    // {
    //   source: { id: 'wired', name: 'Wired' },
    //   author: 'Makena Kelly',
    //   title: 'Joe Biden Drops Out of 2024 Presidential Election',
    //   description: 'President Joe Biden announced Sunday that he would “stand down” from his reelection campaign.',
    //   url: 'https://www.wired.com/story/joe-biden-drops-out-of-2024-election/',
    //   urlToImage: 'https://media.wired.com/photos/6685accfe1c85c0efa7aac97/191:100/w_1280,c_limit/Biden-Drop-Out-Election-Politics-2159611664.jpg',
    //   publishedAt: '2024-07-21T18:12:46Z',
    //   content: 'President Joe Biden dropped out of the presidential race on Sunday following a nearly monthlong pressure campaign mounted by Democratic leaders and donors to oust him.\r\n' +
    //     'It has been the greatest honor… [+3615 chars]'
    // }
    // {
    //   source: { id: null, name: 'BBC News' },
    //   author: null,
    //   title: "Biden vows to fight on after 'disastrous' Trump debate",
    //   description: 'The president says he would not be running if he could not do the job, as his performance sparks concern among Democrats.',
    //   url: 'https://www.bbc.com/news/articles/cne4z2p7nl4o',
    //   urlToImage: 'https://ichef.bbci.co.uk/news/1024/branded_news/9fad/live/0a56abf0-359b-11ef-bdc5-41d7421c2adf.jpg',
    //   publishedAt: '2024-06-28T22:10:16Z',
    //   content: 'By Bernd Debusmann Jr, BBC News, Washington \r\n' +
    //     'US President Joe Biden has hit back at criticism over his age, telling supporters in a fiery speech that he will win re-election in November after a poor… [+3273 chars]'
    // }

    const bulkArticles = refactoredArticles.map(article => {
      return new this.articleModel({
        project: "66aa3fb0d29bede040236a33",//project._id,
        title: article.title,
        author: article.author,
        datePublished: new Date(article.publishedAt),
        url: article.url,
        description: article.description,
        source: article.source,
        // content: "",
        summary: article.content,
      })
    })

    const savedArticles = await this.articleModel.insertMany(bulkArticles)





    // console.log(articles)

    const urlsToScrape = []
    //todo scrape each article and generate title and content
    // const formattedArticles = articles.articles.map(article => {
    //   urlsToScrape.push(article.url)
    //   // return {
    //   //   title: article.title,
    //   //   author: article.author,
    //   //   url: article.url,
    //   //   publishedAt: article.publishedAt
    //   // }

    // })
    // console.log(urlsToScrape)
    // const result = await this.scrapeNews(articleResult.articles)

    // const narrativeResult = await this.openAPIService.getNarrative({
    //   researchQuestion: project.researchQuestion,
    //   articles: result
    // })

    return {
      statusCode: HttpStatus.OK,
      message: 'Articles fetched successfully!',
      data: savedArticles,
    };

    //todo send each article in a distinct format to GPT-4 llm model to do it's work on the narrative, dominance and evolution
    //todo the llm should pick first 10 
    //todo save the result in your DB 
    //todo generate figures for domiance and evolution chart
    //todo return to the client 

  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article`;
  // }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }


  // Replace with the URL of the news article you want to scrape
  // const url = 'https://www.telegraph.co.uk/world-news/2024/07/24/tax-abortion-and-immigration-where-kamala-harris-stands/';

  async fetchAndScrape(url) {
    try {
      // Fetch the HTML content from the URL
      const { data: articleData } = await axios.get(url);

      // Load the HTML into cheerio
      const $ = cheerio.load(articleData);

      // Extract the title from the article
      // const title = $('h1').text() || $('article h1').text() || $('header h1').text() || $('.headline').text() || $('main h1').text();

      // Extract the main content from the article
      const contentSelectors = [
        'p',
        // Add more selectors as needed
      ];

      let content = '';
      contentSelectors.forEach(selector => {
        $(selector).each((index, element) => {
          content += $(element).text() + '\n';
        });
      });

      // Return the extracted data
      return this.openAPIService.generateSummary(content.trim())
      // return { url, title: title.trim(), content: content.trim() };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.warn(`Skipping URL due to 401 Unauthorized: ${url}`);
        return null;  // Returning null to indicate skipping
      }

      if (error.response && error.response.status === 403) {
        console.warn(`Skipping URL due to 401 Unauthorized: ${url}`);
        return null;  // Returning null to indicate skipping
      } else {
        console.error('Error fetching or parsing data from:', url, error);
        // return { url, title: null, content: null, error: error.message };
        return null;
      }
    }
  }

  async scrapeNews(articles) {
    // Use Promise.all to process all URLs concurrently
    const results = await Promise.all(articles.map(async (article) => {
      const content = await this.fetchAndScrape(article.url);
      if (content !== null) {
        console.log(article.url, 'here')
        return {
          source: article.source.name,
          title: article.title,
          author: article.author,
          publishedAt: article.publishedAt,
          content: content,
          url: article.url,
          description: article.description
        };
      }
      return null; // Return null if content is null
    }));

    // Filter out null results (skipped due to 401 Unauthorized or other errors)
    const filteredResults = results.filter(result => result !== null);
    return filteredResults;
  }


}
