export interface IUsersClientsRepository {
  create(
    data: IUsersClientsRepository.CreateUserClient,
  ): Promise<IUsersClientsRepository.UserClient>;
}

export namespace IUsersClientsRepository {
  export interface UserClient {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateUserClient {
    email: string;
    password: string;
  }
}
