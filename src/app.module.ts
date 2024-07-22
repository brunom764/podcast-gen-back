import { Module } from '@nestjs/common'
import { PrismaModule } from './services/prisma/prisma.module'
import { PodcastModule } from '@core/podcast/podcast.module'
import { GoogleNewsModule } from './services/google-news/google-news.module'
import { OpenaiModule } from './services/openai/openai.module'
import { TextToSpeechModule } from './services/text-to-speech/text-to-speech.module'

@Module({
	imports: [
		PodcastModule,
		PrismaModule,
		GoogleNewsModule,
		TextToSpeechModule,
		OpenaiModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
