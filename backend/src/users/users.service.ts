import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

@Injectable()
export class UsersService {
  private storage = new FileStorageService<any>('users.json');

  async findByUsername(username: string) {
    const users = await this.storage.read();
    return users.find(u => u.username === username);
  }

  async create(user: any) {
    const users = await this.storage.read();
    const newUser = { id: Date.now(), ...user };
    users.push(newUser);
    await this.storage.write(users);
    return newUser;
  }
}