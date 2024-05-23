import { IManageStorage } from '@/domain/interfaces';
import { ManageStorage } from '@/infra/supabase';

export const makeSupabaseStorageFactory = (): IManageStorage => {
  return new ManageStorage();
};
