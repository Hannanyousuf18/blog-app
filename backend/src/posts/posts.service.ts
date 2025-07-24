import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';

@Injectable()
export class PostsService {
  private storage = new FileStorageService<any>('posts.json');

  async findAll(page = 1, pageSize = 5) {
    const all = await this.storage.read();
    const start = (page - 1) * pageSize;
    return all.slice(start, start + pageSize);
  }

  async findOne(id: number) {
    const all = await this.storage.read();
    return all.find(p => p.id === id);
  }

  async create(post: any) {
    const all = await this.storage.read();
    const newPost = { id: Date.now(), ...post, publishedAt: new Date().toISOString() };
    all.unshift(newPost);
    await this.storage.write(all);
    return newPost;
  }
}