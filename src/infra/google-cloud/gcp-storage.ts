import { IGCPStorage } from '@/domain/interfaces';
import { Storage } from '@google-cloud/storage';

export class GCPStorage implements IGCPStorage {
  private readonly gcpStorage: Storage;

  constructor() {
    this.gcpStorage = new Storage();
  }

  async uploadFile({
    bucketName,
    fileName,
    buffer,
    mimetype,
  }: IGCPStorage.UploadFile): Promise<string> {
    await this.gcpStorage
      .bucket(bucketName)
      .file(fileName)
      .save(buffer, { contentType: mimetype });

    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
  }
}
