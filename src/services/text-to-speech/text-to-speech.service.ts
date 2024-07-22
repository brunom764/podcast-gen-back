import textToSpeech from '@google-cloud/text-to-speech'
import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import util from 'util'

@Injectable()
export class TextToSpeechService {
	private readonly client

	constructor() {
		this.client = new textToSpeech.TextToSpeechClient({
			options: {
				credentials: {
					type: process.env.GOOGLE_APPLICATION_CREDENTIALS_TYPE,
					project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID,
					private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY_ID,
					private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
					client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
					client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID,
					auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_URI,
					token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_TOKEN_URI,
					auth_provider_x509_cert_url:
						process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
					client_x509_cert_url:
						process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_X509_CERT_URL,
					universe_domain: process.env.GOOGLE_APPLICATION_CREDENTIALS_UNIVERSE_DOMAIN
				}
			}
		})
	}

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
			return `${id}.mp3`
		} catch (error) {
			throw new Error('text-to-speech/generate-audio-failed')
		}
	}
}
