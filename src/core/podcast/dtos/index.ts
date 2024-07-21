
import { IsString, Length } from 'class-validator'

export class PodcastDto {

    @IsString({ message: 'title must be a string' })
    title: string
    
	@IsString({ message: 'category must be a string' })
	category: string

	@IsString({ message: 'period must be a string' })
	period: string
}
