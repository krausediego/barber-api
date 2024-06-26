import { SpecialtyTypes } from '@/domain/interfaces/utils';

export interface IUsersProfilesRepository {
  create(
    data: IUsersProfilesRepository.CreateUserProfile,
  ): Promise<IUsersProfilesRepository.UserProfile>;
  findByUserId(
    data: IUsersProfilesRepository.FindByIdUserId,
  ): Promise<IUsersProfilesRepository.FindByUserIdResponse | null>;
  update(data: IUsersProfilesRepository.UpdateProfile): Promise<void>;
}

export namespace IUsersProfilesRepository {
  export interface UserProfile {
    id: string;
    name: string;
    avatarUrl: string;
    specialties: SpecialtyTypes[];
    userId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface UpdateProfile {
    id: string;
    name?: string;
    avatarUrl?: string;
    specialties?: SpecialtyTypes[];
  }

  export interface UpdateProfileService {
    id: string;
    name?: string;
    avatar?: {
      fileName: string;
      buffer: Buffer;
      mimetype: string;
    };
    specialties?: SpecialtyTypes[];
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

  export interface FindByUserIdResponse extends UserProfile {
    user: {
      email: string;
      role: 'EMPLOYEE' | 'ADMIN';
    };
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
