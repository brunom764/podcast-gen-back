import textToSpeech from '@google-cloud/text-to-speech'
import * as fs from 'fs'
import util from 'util'

export class TextToSpeechService {
	private readonly client = new textToSpeech.TextToSpeechClient()

	constructor() {}

	async generateAudio(text: string, id: string) {
		try {
			const request = {
				input: { text: text },
				voice: {
					languageCode: 'pt-BR',
					name: 'pt-BR-Wavenet-B',
					ssml_gender: 'NEUTRAL'
				},
				audioConfig: { audioEncoding: 'MP3' }
			}
			const [response] = await this.client.synthesizeSpeech(request)
			const writeFile = util.promisify(fs.writeFile)
			await writeFile(`${id}.mp3`, response.audioContent, 'binary')
			console.log(`Audio content written to file: ${id}.mp3.mp3`)
		} catch (error) {
			throw new Error('text-to-speech/generate-audio-failed')
		}
	}
}
