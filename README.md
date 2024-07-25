# PodcastGen- BackEnd

Backend do PodcastGen, um gerador de podcast a partir da IA generativa

# Features

* Usuários podem criar podcasts a partir de um tópico e dia
* O Usuário pode acessar podcasts feitos por outros

# Infos 
- A Obtenção de notícias é feita pela api do google news, utilizando a "Globo" como fonte

- O texto do podcast é gerado pelo GPT 4 [OpenAI](https://platform.openai.com/docs/introduction).

- O áudio do podcast é gerado pelo google-cloud/text-to-speech

- Os áudios são armazenados num storage-blob da azure

## Contributing

Contribuições para o Parrot são muito bem-vindas! Se você gostaria de contribuir, siga estas instruções:

1. Faça um fork do repositório;
2. Crie sua branch de funcionalidade (`git checkout -b feature/SuaFeature`);
3. Adicione suas alterações (`git add .`);
3. Faça commits das suas alterações (`git commit -m 'Adicionando uma funcionalidade'`);
4. Faça push para a branch (`git push origin feature/SuaFeature`);
5. Crie um novo Pull Request.

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


