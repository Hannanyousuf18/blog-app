import { Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/common/file-storage.service';
import { User } from 'src/interface/user';

@Injectable()
export class UsersService {
  private storage = new FileStorageService<User>('users.json');

  async create(user: User) {
    const users = await this.storage.read();
    const newUser = { id: Date.now(), ...user };
    users.push(newUser);
    await this.storage.write(users);
    return newUser;
  }
  async findByEmail(email: string) {
    const users = await this.storage.read();
    return users.find((u) => u.email === email);
  }
}
