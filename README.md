# PodcastGen- BackEnd

The PodcastGen was developed to solve the difficulty people have in keeping up with the latest news due to their busy routines. Using generative artificial intelligence, PodcastGen transforms news into dynamic and engaging podcasts, allowing users to stay updated on the topics they care about while performing other activities.

## Objectives
- Provide an innovative and efficient way for people to stay informed.
- Transform relevant news into podcasts, making it easier to consume information.

## Features
- Users can create podcasts based on a topic and date.
- Users can access podcasts made by others.

## System Components
1. **API Integration**
   - Connection with NewsAPI to get the news.
2. **AI Processing**
   - Using GPT-4 for news data analysis and creating audio scripts.
3. **Podcast Production**
   - Converting scripts into high-quality audio using Google Cloud Text-to-Speech.

## Tools Used
- **News API:** NewsAPI for updated content.
- **Generative AI:** GPT-4 for script creation.
- **Text-to-Speech (TTS):** Google Cloud Text-to-Speech for text-to-audio conversion.
- **Frontend Web:** Vue.js for the user interface.
- **Backend:** NestJS for server logic and API integration.
- **Database:** PostgreSQL for data storage and Azure Blob Storage for storing audios.

## Project Execution
1. **API Integration Development**
   - Connection and configuration of NewsAPI.
   - Validation and filtering of relevant news.
2. **Generative AI Implementation**
   - Configuration of GPT-4 for analysis and script generation.
   - Quality testing of generated scripts.
3. **TTS System Configuration**
   - Integration with Google Cloud Text-to-Speech.
   - Adjusting parameters for natural and pleasant voices.
4. **Frontend Development**
   - Creating the interface with Vue.js.
   - Usability and responsiveness testing.
5. **Backend Configuration**
   - Development with NestJS.
   - Integration with news API and database.
6. **Data Storage**
   - Configuring PostgreSQL for user data and podcast history.
   - Using Azure Blob Storage for audio storage.

## Important Links
- **Backend:** [GitHub](https://github.com/brunom764/podcast-gen-back)
- **Frontend:** [GitHub](https://github.com/laysearaujo/PodcastGen)
- **Deploy:** [Vercel](https://podcast-gen.vercel.app/)
- **Prototype:** [Google Colab](https://colab.research.google.com/drive/1N0Dcub1wpvdlZuX284SMO5G_JnABAy03)

## Contributing

# Contributions to Parrot are very welcome! If you would like to contribute, please follow these instructions:

1. Fork the repository;
2. Create your feature branch (`git checkout -b feature/YourFeature`);
3. Add your changes (`git add .`);
4. Commit your changes (`git commit -m 'Adding a feature'`);
5. Push to the branch (`git push origin feature/YourFeature`);
6. Create a new Pull Request.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start:dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Dependecies

	@nestjs/common: 10.2.8,
	@nestjs/config: 3.1.1,
	@nestjs/core: 10.2.8,
	@nestjs/cli: 10.2.1,
	@nestjs/platform-express: 10.2.8,
	@nestjs/schedule: 4.0.1,
	@nestjs/swagger: 7.3.0,
	@prisma/client: 5.6.0,
	axios: 1.6.2,
	class-transformer: 0.5.1,
	class-validator: 0.14.0,
	dotenv: 16.3.1,
	firebase-admin: 11.11.1,
	openai: 4.25.0,
	prisma: 5.6.0,
	reflect-metadata: 0.1.13,
	rxjs: 7.8.1


