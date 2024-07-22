import { Global, Module } from '@nestjs/common'
import { GoogleNewsService } from './google-news.service'

@Global()
@Module({
	providers: [GoogleNewsService],
	exports: [GoogleNewsService]
})
export class GoogleNewsModule {}
