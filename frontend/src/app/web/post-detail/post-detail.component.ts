import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent {
  private readonly postService = inject(PostService);
  private readonly route = inject(ActivatedRoute);

  postId = '';
  post!: Post;

  constructor() {
    this.postId = this.route.snapshot.params['postId'];
  }

  ngOnInit() {
    this.postService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
      }
    });
  }
}
