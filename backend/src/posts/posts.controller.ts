import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileStorageService } from 'src/common/file-storage.service';
import { User } from 'src/interface/user';
import { PostBase } from 'src/interface/post';

@Controller('posts')
export class PostsController {
  private storage = new FileStorageService<User>('users.json');

  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(@Query('page') page = 1) {
    const users = await this.storage.read();
    return (await this.postsService.findAll(+page)).map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      return {
        ...post,
        authorName: author?.name || 'Unknown',
      };
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: PostBase, @Request() req: any) {
    return this.postsService.create({
      ...body,
      authorId: req ? req.user.userId : '',
    });
  }
}
