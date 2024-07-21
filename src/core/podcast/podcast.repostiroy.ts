import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/services/prisma/prisma.service'
import { Podcast } from './entities'

@Injectable()
export class PodcastRepository {
	constructor(@Inject(PrismaService) protected prisma: PrismaService) {}

	async createPodcast(podcast: Podcast) {
		return await this.prisma.podcast.create({
            data: {
                id: podcast.id,
                title: podcast.title,
                category: podcast.category,
                period: podcast.period,
                audioUrl: podcast.audioUrl,
                summary: podcast.summary
            }
        })
	}

	async getPodcastById(id: string) {
		return await this.prisma.podcast.findUnique({
			where: {
				id
			}
		})
	}

	async list() {
		return await this.prisma.podcast.findMany({
            select: {
                id: true,
                title: true,
            }
		})
	}

}
