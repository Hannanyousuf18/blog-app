import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../common/file-storage.service';
import { Post, PostBase } from 'src/interface/post';

@Injectable()
export class PostsService {
  private storage = new FileStorageService<Post>('posts.json');

  async findAll(page = 1, pageSize = 5) {
    const post: Post[] = await this.storage.read();
    const start = (page - 1) * pageSize;
    return post.slice(start, start + pageSize);
  }

  async findOne(id: number) {
    const post: Post[] = await this.storage.read();
    return post.find((p) => p.id === id);
  }

  async create(post: PostBase) {
    const posts: Post[] = await this.storage.read();
    const newPost: Post = {
      id: Date.now(),
      ...post,
      publishedAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    await this.storage.write(posts);
    return newPost;
  }
}
