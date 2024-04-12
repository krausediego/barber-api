import { UserRolesEnum } from '@/domain/interfaces';

export interface IUsersRepository {
  create(data: IUsersRepository.CreateUser): Promise<IUsersRepository.User>;
  findByEmail(
    data: IUsersRepository.FindByEmail,
  ): Promise<IUsersRepository.User | null>;
}

export namespace IUsersRepository {
  export interface User {
    id: string;
    email: string;
    password: string;
    role: UserRolesEnum;
    createdAt: Date;
    updatedAt?: Date;
  }

  export interface CreateUser {
    email: string;
    password: string;
    role?: UserRolesEnum;
  }

  export interface FindByEmail {
    email: string;
  }
}
