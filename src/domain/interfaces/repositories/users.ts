export interface IUsersRepository {
  create(data: IUsersRepository.CreateUser): Promise<IUsersRepository.User>;
  findByEmail(
    data: IUsersRepository.FindByEmail,
  ): Promise<IUsersRepository.User | null>;
  findByIdUser(
    data: IUsersRepository.FindById,
  ): Promise<IUsersRepository.User | null>;
  update(
    id: string,
    data: IUsersRepository.UpdateUser,
  ): Promise<IUsersRepository.User>;
}

export namespace IUsersRepository {
  export interface User {
    id: string;
    email: string;
    password: string;
    role: 'EMPLOYEE' | 'ADMIN';
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateUser {
    email: string;
    password: string;
    role?: 'EMPLOYEE' | 'ADMIN';
  }

  export interface UpdateUser {
    role?: 'EMPLOYEE' | 'ADMIN';
  }

  export interface FindByEmail {
    email: string;
  }

  export interface FindById {
    id: string;
  }
}
