import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebTopbar } from './component/web.topbar';
import { WebFooter } from './component/web.footer';

@Component({
  selector: 'web-layout',
  standalone: true,
  imports: [WebTopbar, RouterModule, WebFooter],
  template: `<div class="layout-wrapper">
    <web-topbar></web-topbar>
    <div class="p-4 mt-16">
      <div class="layout-main">
        <router-outlet></router-outlet>
      </div>
      <web-footer></web-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div> `
})
export class WebLayout {}
