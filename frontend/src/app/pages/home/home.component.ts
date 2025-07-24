import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import {
  ModuleRegistry,
  AllCommunityModule,
  themeMaterial
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-home',
  imports: [AgGridAngular],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  theme = themeMaterial;
  columnDefs: ColDef[] = [
    { field: 'title' },
    { field: 'excerpt' },
    { field: 'authorName' },
    { field: 'publishedAt' }
  ];
  defaultColDef: ColDef = {
    flex: 1
  };

  rowData = [
    {
      title: 'test',
      excerpt: 'test1',
      authorName: 'test1',
      publishedAt: 'test1'
    }
  ]; // fetched from API
}
