import { createReadStream, existsSync, mkdirSync } from 'fs';
import { BlobServiceClient } from '@azure/storage-blob';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config';

@Injectable()
export class StorageService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService<AppConfig>,
  ) {}

  async uploadAudio(localPath: string, id: string) {
    const storageConfig =
      this.configService.get<AppConfig['storage']>('storage');

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      storageConfig.azure.connectionString,
    );
    const containerClient = blobServiceClient.getContainerClient(
      storageConfig.azure.containerName,
    );

    
    const blockBlobClient = containerClient.getBlockBlobClient(`${id}.mp3`);
    const readStream = createReadStream(localPath);
    const blockSize = 4 * 1024 * 1024; 

    await blockBlobClient.uploadStream(readStream, blockSize, 5, { 
      blobHTTPHeaders: { blobContentType: 'audio/mpeg' },
    });

    return { outputPath: blockBlobClient.url };
  }

}