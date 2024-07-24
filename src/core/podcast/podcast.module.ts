import { Module } from '@nestjs/common'
import { OpenaiModule } from 'src/services/openai/openai.module'
import { PodcastController } from './podcast.controller'
import { PodcastService } from './podcast.service'
import { PodcastRepository } from './podcast.repostiroy'
import { GoogleNewsModule } from 'src/services/google-news/google-news.module'
import { TextToSpeechModule } from 'src/services/text-to-speech/text-to-speech.module'
import { StorageModule } from 'src/services/storage/storage.module'

@Module({
	imports: [OpenaiModule, TextToSpeechModule, GoogleNewsModule, StorageModule],
	controllers: [PodcastController],
	providers: [PodcastService, PodcastRepository]
})
export class PodcastModule {}
