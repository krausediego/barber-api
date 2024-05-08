export interface IGCPStorage {
  uploadFile(props: IGCPStorage.UploadFile): Promise<string>;
  deleteFile(props: IGCPStorage.DeleteFile): Promise<void>;
}

export namespace IGCPStorage {
  export interface UploadFile {
    bucketName: string;
    fileName: string;
    buffer: Buffer;
    mimetype: string;
  }

  export interface DeleteFile {
    bucketname: string;
    fileName: string;
  }
}
