import { Module } from '@nestjs/common'
import { PrismaModule } from './services/prisma/prisma.module'
import { PodcastModule } from '@core/podcast/podcast.module'
import { GoogleNewsModule } from './services/google-news/google-news.module'
import { OpenaiModule } from './services/openai/openai.module'
import { TextToSpeechModule } from './services/text-to-speech/text-to-speech.module'
import { StorageModule } from './services/storage/storage.module'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({ load: [configuration] }),
		PodcastModule,
		PrismaModule,
		GoogleNewsModule,
		TextToSpeechModule,
		OpenaiModule,
		StorageModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
