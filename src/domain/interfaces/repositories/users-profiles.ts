import { SpecialtyTypes } from '@/domain/interfaces/utils';

export interface IUsersProfilesRepository {
  create(
    data: IUsersProfilesRepository.CreateUserProfile,
  ): Promise<IUsersProfilesRepository.UserProfile>;
  findByUserId(
    data: IUsersProfilesRepository.FindByIdUserId,
  ): Promise<IUsersProfilesRepository.UserProfile | null>;
}

export namespace IUsersProfilesRepository {
  export interface UserProfile {
    id: string;
    name: string;
    avatarUrl: string;
    specialties: SpecialtyTypes[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CreateUserProfileService {
    name: string;
    avatar: {
      fileName: string;
      buffer: Buffer;
      mimetype: string;
    };
    specialties: SpecialtyTypes | SpecialtyTypes[];
    userId: string;
  }

  export interface CreateUserProfile {
    name: string;
    avatarUrl: string;
    specialties: SpecialtyTypes[];
    userId: string;
  }

  export interface FindByIdUserId {
    userId: string;
  }
}
