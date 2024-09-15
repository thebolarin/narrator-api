import { Injectable, HttpStatus } from '@nestjs/common';
import { AppConfig } from '../../app.config';
import * as NewsAPI from 'newsapi'
const newsapi = new NewsAPI(AppConfig.NEWSAPI_KEY);

@Injectable()
export class NewsAPIService {
	constructor() { }

	// getArticles(query) {
	// 	const url = new URL(`${AppConfig.PAYGATE_VAS_BASE_URL}/vas/beneficiaries`);
	// 	const params = query;

	// 	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	// 	return fetch(url, {
	// 		method: 'GET',
	// 		headers: {
	// 			"Content-Type": "application/json",
	//             "X-Admin-Key": AppConfig.PAYGATE_VAS_TOKEN,
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(res => {
	// 		return res;
	// 	}).catch((err) => {
	// 		return {
	// 			statusCode: HttpStatus.BAD_REQUEST,
	// 			message: 'Invalid request. Please try again.'
	// 		};
	// 	});
	// }

	async getArticles(query) {
		const { keyword: q, researchStartDate: from, researchEndDate: to, } = query
		const result = await newsapi.v2.everything({ q, from, to, language: 'en', sortBy: 'relevancy', pageSize: 10 })
		console.log(result)
		return result
	}

	fetchArticles() {
		return fetch("https://newsdata.io/api/1/latest", {
			method: 'GET',
			headers: {
				"X-ACCESS-KEY": process.env.NEWSAPI_ACCESS_KEY,
				"Content-Type": "application/json"
			},
		})
		.then(res => res.json())
		.then(res => {
			return res;
		}).catch((err) => {
			console.log(err)
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message: 'Invalid request. Please try again.'
			};
		});
	}

}
