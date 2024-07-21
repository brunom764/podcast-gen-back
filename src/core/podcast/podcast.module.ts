
import { Module } from '@nestjs/common'
import { OpenaiModule } from 'src/services/openai/openai.module';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';
import { PodcastRepository } from './podcast.repostiroy';

@Module({
	imports: [OpenaiModule],
	controllers: [PodcastController],
	providers: [PodcastService, PodcastRepository]
})
export class PodcastModule {}
