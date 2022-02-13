import CreateUserService from "./CreateUserService";
import { FakeUserRepository } from "../domain/repositories/Fakes/FakeUserRepository";

describe('Create User', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUserRepository();

        const user = new CreateUserService(fakeUsersRepository);

        user.execute({
            name: 'Guilherme',
            email: 'gui@gmail.com',
            password: '12345'
        });

        expect(user).toHaveProperty('id');
    });
})
