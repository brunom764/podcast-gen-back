import { Module } from '@nestjs/common'
import { PrismaModule } from './services/prisma/prisma.module'
import { PodcastModule } from '@core/podcast/podcast.module'

@Module({
	imports: [PodcastModule, PrismaModule],
	controllers: [],
	providers: []
})
export class AppModule {}
