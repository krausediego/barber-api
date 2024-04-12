export interface IGCPStorage {
  uploadFile(props: IGCPStorage.UploadFile): Promise<string>;
}

export namespace IGCPStorage {
  export interface UploadFile {
    bucketName: string;
    fileName: string;
    buffer: Buffer;
    mimetype: string;
  }
}
