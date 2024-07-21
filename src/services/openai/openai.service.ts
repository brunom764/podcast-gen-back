import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenaiService {
	private readonly openai = new OpenAI()

	constructor() {
		this.openai.apiKey = process.env.OPENAI_API_KEY
	}

	async generateSummary(prompt: string) {
		try {
			const sumarry = await this.openai.chat.completions.create({
				messages: [
					{
						role: 'system',
						content: prompt
					}
				],
				model: 'gpt-4'
			})
			return sumarry.choices[0].message.content
		} catch (error) {
			throw new Error('openai/generate-summary-failed')
		}
	}
}
