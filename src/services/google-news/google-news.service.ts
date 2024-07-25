import { Injectable } from '@nestjs/common'

export interface NewsResponse {
	status: 'ok'
	totalResults: number
	articles: Article[]
}

interface Article {
	source: Source
	author: string
	title: string
	description: string
	url: string
	urlToImage: string
	publishedAt: string
	content: string
}

interface Source {
	id: string
	name: string
}

@Injectable()
export class GoogleNewsService {
	private apiKey: string

	constructor() {
		this.apiKey = process.env.NEWS_API_KEY
	}

	async getNews(category: string, period: string): Promise<NewsResponse> {
		const url =
			'https://newsapi.org/v2/everything?' +
			`q=${category}&` +
			`from=${period}&` +
			'sortBy=popularity&' +
			'sources=globo&' +
			`apiKey=${this.apiKey}`

		const req = new Request(url)
		return fetch(req)
			.then(function (response) {
				return response.json() as Promise<NewsResponse>
			})
			.catch(function () {
				throw new Error('google-news/get-news-failed')
			})
	}

	async getRandomNews(category: string, period: string): Promise<NewsResponse> {
		const url =
			'https://newsapi.org/v2/everything?' +
			`q=${category}&` +
			`from=${period}&` +
			'sortBy=popularity&' +
			`apiKey=${this.apiKey}`

		const req = new Request(url)

		return fetch(req)
			.then(function (response) {
				return response.json() as Promise<NewsResponse>
			})
			.catch(function () {
				throw new Error('google-news/get-news-failed')
			})
	}
}
