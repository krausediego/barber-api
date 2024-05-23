export interface IManageStorage {
  upload(
    params: IManageStorage.UploadParams,
  ): Promise<IManageStorage.UploadResponse>;
  delete(params: IManageStorage.DeleteParams): Promise<void>;
}

export namespace IManageStorage {
  export type UploadParams = {
    bucketName: string;
    path: string;
    fileBody: Buffer;
    contentType: string;
  };

  export type UploadResponse = {
    fileUrl: string;
  };

  export type DeleteParams = {
    bucketName: string;
    fileName: string[];
  };
}
