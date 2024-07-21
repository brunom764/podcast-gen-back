
import { Body, Controller, Get, InternalServerErrorException, Param, Post } from "@nestjs/common"
import { PodcastDto } from "./dtos"
import { PodcastService } from "./podcast.service"

@Controller('podcast')
export class PodcastController {
	constructor(private readonly podcastService: PodcastService) {}

	@Post('create')
	async createpodcast(@Body() podcast: PodcastDto) {
		try {
			return await this.podcastService.createPodcast(
                podcast.title,
				podcast.category,
				podcast.period,
			)
		} catch (error) {
			throw new InternalServerErrorException('podcast/create-failed')
		}
	}

	@Get(':id')
	async getpodcastById(@Param('id') id: string) {
		try {
			return await this.podcastService.getPodcastById(id)
		} catch (error) {
			throw new InternalServerErrorException('podcast/get-by-id-failed')
		}
	}

	
	@Get()
	async getpodcastsByTransId() {
		try {
			return await this.podcastService.list()
		} catch (error) {
			throw new InternalServerErrorException('podcast/get-by-transId-failed')
		}
	}

}