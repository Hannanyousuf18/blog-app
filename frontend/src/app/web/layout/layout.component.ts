import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { WebHeader } from './components/header.component';
import { WebFooter } from './components/footer.component';

@Component({
  selector: 'web-layout',
  standalone: true,
  imports: [
    RouterModule,
    RippleModule,
    StyleClassModule,
    ButtonModule,
    DividerModule,
    WebHeader,
    WebFooter
  ],
  template: `
    <div class="bg-surface-0 dark:bg-surface-900">
      <div id="home" class="landing-wrapper overflow-hidden">
        <web-header
          class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static"
        />
        <router-outlet></router-outlet>
        <web-footer />
      </div>
    </div>
  `
})
export class WebLayout {}
