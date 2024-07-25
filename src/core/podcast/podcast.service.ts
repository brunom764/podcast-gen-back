import { Inject, Injectable } from '@nestjs/common'
import { OpenaiService } from 'src/services/openai/openai.service'
import { Podcast } from './entities'
import * as uuid from 'uuid'
import { PodcastRepository } from './podcast.repostiroy'
import { GoogleNewsService } from 'src/services/google-news/google-news.service'
import { TextToSpeechService } from 'src/services/text-to-speech/text-to-speech.service'
import { StorageService } from 'src/services/storage/storage.service'

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
		private readonly googleNewsService: GoogleNewsService,
		@Inject(StorageService)
		private readonly storageService: StorageService
	) {}

	async createPodcast(title: string, category: string, period: string) {
		const podcast = new Podcast(uuid.v4(), title, category, period)
		let news
		news = await this.googleNewsService.getNews(category, period)
		if (!news || !news.articles || news.articles.length === 0) {
			news = await this.googleNewsService.getRandomNews(category, period)
			if (!news || !news.articles || news.articles.length === 0) {
				throw new Error('No news found')
			}
		}
		const prompt =
			'filter pertinent information and generate a summary in Brazilian Portuguese of these news using simple, informal language (as if you were telling a story to a friend) and clearly explaining the concepts that appear in the news. Remember to consider all of them in the summary and that each news item has the format “Title:”, “Description:”.'
		const articles = []
		for (const article of news.articles) {
			if (articles.length < 10) {
				articles.push({ Title: article.title, description: article.description });
			  } else {
				break;
			  }
		}
		const summary = await this.openAiService.generateSummary(
			`${prompt} ${JSON.stringify(articles)}`
		)
		if (!summary) {
			throw new Error('No summary found')
		}
		podcast.addSummary(summary)
		const audioPath = await this.textToSpeechService.generateAudio(summary, podcast.id)
		if (!audioPath) {
			throw new Error('No audio found')
		}
		const audioAzurePath = await this.storageService.uploadAudio(audioPath, podcast.id)
		podcast.addAudioUrl(audioAzurePath.outputPath)
		return await this.podcastRepository.createPodcast(podcast)
	}

	async getPodcastById(id: string) {
		return await this.podcastRepository.getPodcastById(id)
	}

	async list() {
		return await this.podcastRepository.list()
	}
}
