import { Inject, Injectable } from '@nestjs/common'
import { OpenaiService } from 'src/services/openai/openai.service'
import { Podcast } from './entities'
import * as uuid from 'uuid'
import { PodcastRepository } from './podcast.repostiroy'
import { GoogleNewsService } from 'src/services/google-news/google-news.service'
import { TextToSpeechService } from 'src/services/text-to-speech/text-to-speech.service'

@Injectable()
export class PodcastService {
	constructor(
		@Inject(PodcastRepository)
		private readonly podcastRepository: PodcastRepository,
		@Inject(OpenaiService)
		private readonly openAiService: OpenaiService,
		@Inject(TextToSpeechService)
		private readonly textToSpeechService: TextToSpeechService,
		@Inject(GoogleNewsService)
		private readonly googleNewsService: GoogleNewsService
	) {}

	async createPodcast(title: string, category: string, period: string) {
		const podcast = new Podcast(uuid.v4(), title, category, period)
		const news = await this.googleNewsService.getNews(category, period)
		const prompt =
			'Filter pertinent information and generate a summary in paragraph format in Brazilian Portuguese for the following news. Remember to consider all of them in the summary and that each news has the format "Title:", "Description:".'
		const articles = []
		for (const article of news.articles) {
			articles.push({ Title: article.title, description: article.description })
		}
		const summary = await this.openAiService.generateSummary(
			`${prompt} ${JSON.stringify(articles)}`
		)
		podcast.addSummary(summary)
		const audioPath = await this.textToSpeechService.generateAudio(summary, podcast.id)
		podcast.addAudioUrl(audioPath)
		console.log(audioPath)
		return await this.podcastRepository.createPodcast(podcast)
	}

	async getPodcastById(id: string) {
		return await this.podcastRepository.getPodcastById(id)
	}

	async list() {
		return await this.podcastRepository.list()
	}
}
