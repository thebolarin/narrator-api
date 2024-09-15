import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";
import * as StringToJson from 'string-to-json-converter';
const fmt2json = require('format-to-json');

// Instantiate the OpenAI client
const openai = new OpenAI({
  organization: 'org-GCuZwSMgl2jdu1YI9NoTnupX',
  project: 'proj_RFBvtAvQ9qkZqgio5WG9qujB',
});

@Injectable()
export class OpenAPIService {
  constructor() { }

  /**
   * Fetches the narrative analysis from OpenAI.
   *
   * @returns {Promise<any>}
   */
  async generateNarrativeAnalysis(options): Promise<any> {
    const { researchQuestion, articles } = options
    console.log(researchQuestion)
    try {
      // Format the articles into a readable string
      const formattedArticles = articles.map(article => `UniqueId: ${article.uniqueId}\nTitle: ${article.title}\nContent: ${article.summary}`).join("\n\n");

      // Construct the prompt
      //    const prompt = `
      //    Based on the research question: ${researchQuestion}, analyze the provided articles and return the results in JSON format with the following fields:

      //    i am expecting a JSON object, which has two keys articleAnalysis, aggregatedAnalysis, statistics and overallConclusion

      //    articleAnalysis should be an array of objects which consists of the below task, each object in the array is for each article
      //    Title: The title of the article 
      //    Summary: Provide a concise and comprehensive summary of the article.
      //    Narratives: List and explain the main narratives presented in the article.
      //    Dominance: Describe the dominance of each narrative within the article.
      //    Evolution: Explain how these narratives evolve throughout the article, highlighting any changes in focus or perspective.

      //    the Aggregated Analysis: Combine the frequency counts, space assessments, and prominence data across all articles to determine the overall dominance and evolution of each narrative.

      //    the statistics should be all the figures and data i need to visualize this narration on a pie chart

      //    the overallConclusion key reflect on how the findings address the research question and what they reveal about the broader context.       
      //    Ensure the results are short and concise, suitable for a social researcher to quickly understand and move on to the next article.



      //    lastly ensure all your response is in a json format. Full JSON

      //    These are the articles:
      //    ${formattedArticles}
      //  `;

      const prompt = `
    Based on the research question: ${researchQuestion}, analyze the provided articles and return the results in JSON string format with the following fields:

articleAnalysis: An array of objects, each representing an analysis of one article. Each object should include:

UniqueId: The id of the article.
Title: The title of the article.
Summary: A concise and comprehensive summary of the article.
Narratives: A list and explanation of the main narratives presented in the article based on the research question. it should be returned as array of objects.
Dominance: A description of the dominance of each narrative within the article based on the research question, it should be returned as array of objects.
Evolution: An explanation of how the narrative has evolved over time, highlighting any changes in focus or perspective based on the research question. it should be a string.


statistics: Combine the findings from all articles to provide an overall analysis to visualize the top 5 narrative on a pie chart. it should be array of 5 objects i.e narrative and value with the keys in lowercase


overallConclusion: Summarize the findings based on the narrative analysis and use it to answer the research question, Provide feedback on how well the identified narratives address the research question and how social media platforms critically influence these narratives over time. Highlight any gaps or areas for further investigation based on the narrative trends.it should be a string

Ensure the results are short and concise, suitable for a social researcher to quickly understand and move on to the next article.

Remember to return in a json object not a markdown code block

These are the articles: ${formattedArticles} `

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt },
        ],
      });

      const jsonString = response.choices[0].message?.content;
      console.log(jsonString)
      return JSON.parse(jsonString)
      // return jsonString
      // 
      // return fmt2json(jsonString, { withDetails: true });

      //   // Call the OpenAI API
      //   let config: ChatCompletionCreateParamsNonStreaming = {
      //     model: "gpt-4",
      //     messages: [{ role: "system", content: prompt }]
      //   }

      //   // let messages = [{ role: "system", content: prompt }];
      //   let allResponses = '';

      //   while (true) {
      //     const response = await openai.chat.completions.create(config);

      //     const responseContent = response.choices[0].message?.content;
      //     if (responseContent) {
      //       allResponses += responseContent;

      //       // Check if the response indicates there are more parts
      //       if (responseContent.includes('To keep this message short, I\'ll send the analysis of the remaining articles in separate messages.')) {
      //         config.messages = [{ role: "system", content: "Please continue with the analysis of the remaining articles." }];
      //       } else {
      //         break;
      //       }
      //     } else {
      //       break;
      //     }
      //   }

      //  // Combine and parse the JSON response
      //  let parsedResponses;
      //  try {
      //    parsedResponses = JSON.parse(allResponses);
      //  } catch (error) {
      //    // If JSON parsing fails, try to clean up and parse again
      //    const fixedJson = allResponses.replace(/}\s*{/g, '},{');
      //    parsedResponses = JSON.parse(`[${fixedJson}]`);
      //  }

      //  // Log the JSON response
      // return JSON.stringify(parsedResponses, null, 2);
    } catch (error) {
      console.error("Error fetching narrative analysis:", error);
    }
  }

  async generateSummary(text): Promise<any> {
    try {
      const prompt = `Generate a concise and comprehensive summary that can aid narrative analysis of the article in no more than 150 words, it can be less than but not more than. ${text}`
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: prompt },
        ],
      });

      const jsonString = response.choices[0].message?.content;
      return jsonString

    } catch (error) {
      console.error("Error generating summary:", error);
    }
  }

  async extractKeyword(text): Promise<any> {
    try {
      const prompt = `Given the research question, ${text} I am suppose to generate a keyword that can be used to query an api to fetch news and blog articles that can be used for research based on the research question so i need just one keyword that can be used to make that query. Your response should be a json
`
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "system", content: prompt },
        ],
      });

      const jsonString = response.choices[0].message?.content;
      console.log(jsonString)
      return jsonString

    } catch (error) {
      console.error("Error generating keyword:", error);
    }
  }

}
