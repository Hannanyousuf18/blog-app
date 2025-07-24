import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import {
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial
} from 'ag-grid-community';
import { Post, PostService } from '../../services/post.service';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-home',
  imports: [AgGridAngular],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly postService = inject(PostService);
  private readonly router = inject(Router);

  theme = themeMaterial;
  columnDefs: ColDef[] = [
    { field: 'title' },
    { field: 'body', headerName: 'Excerpt' },
    { field: 'authorId', headerName: 'Author' },
    { field: 'publishedAt', headerName: 'Published Date' }
  ];
  defaultColDef: ColDef = {
    flex: 1
  };

  posts: Post[] = [];

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      }
    });
  }

  onRowClicked(event: any) {
    const id = event.data.id;
    this.router.navigate(['/post', id]);
  }
}
