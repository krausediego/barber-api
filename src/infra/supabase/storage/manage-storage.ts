import { BadRequestError } from '@/application/errors';
import { IManageStorage } from '@/domain/interfaces';
import env from '@/main/config/environments/supabase';

import { supabase } from '../supabase-client';

export class ManageStorage implements IManageStorage {
  constructor() {}

  async upload({
    bucketName,
    path,
    fileBody,
    contentType,
  }: IManageStorage.UploadParams): Promise<IManageStorage.UploadResponse> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, fileBody, { contentType });

    if (error) {
      throw new BadRequestError('Error in upload file');
    }

    const fileUrl = `${env.projectUrl}/storage/v1/object/public/${bucketName}/${data.path}`;

    return { fileUrl };
  }

  async delete({
    bucketName,
    fileName,
  }: IManageStorage.DeleteParams): Promise<void> {
    const { error } = await supabase.storage.from(bucketName).remove(fileName);

    if (error) {
      throw new BadRequestError('Error in delete file.');
    }
  }
}
