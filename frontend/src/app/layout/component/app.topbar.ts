import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { SplitButton } from 'primeng/splitbutton';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    Menu,
    Button,
    SplitButton
  ],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
        <svg
          class="rounded-full"
          id="visual"
          viewBox="0 0 600 600"
          width="40"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <path
            d="M0 91L55 91L55 97L109 97L109 97L164 97L164 49L218 49L218 121L273 121L273 97L327 97L327 61L382 61L382 121L436 121L436 103L491 103L491 97L545 97L545 127L600 127L600 121L600 0L600 0L545 0L545 0L491 0L491 0L436 0L436 0L382 0L382 0L327 0L327 0L273 0L273 0L218 0L218 0L164 0L164 0L109 0L109 0L55 0L55 0L0 0Z"
            fill="#fa7268"
          ></path>
          <path
            d="M0 235L55 235L55 235L109 235L109 277L164 277L164 241L218 241L218 289L273 289L273 337L327 337L327 325L382 325L382 265L436 265L436 217L491 217L491 205L545 205L545 385L600 385L600 301L600 119L600 125L545 125L545 95L491 95L491 101L436 101L436 119L382 119L382 59L327 59L327 95L273 95L273 119L218 119L218 47L164 47L164 95L109 95L109 95L55 95L55 89L0 89Z"
            fill="#ea5e66"
          ></path>
          <path
            d="M0 463L55 463L55 403L109 403L109 403L164 403L164 403L218 403L218 385L273 385L273 475L327 475L327 457L382 457L382 433L436 433L436 379L491 379L491 451L545 451L545 481L600 481L600 439L600 299L600 383L545 383L545 203L491 203L491 215L436 215L436 263L382 263L382 323L327 323L327 335L273 335L273 287L218 287L218 239L164 239L164 275L109 275L109 233L55 233L55 233L0 233Z"
            fill="#d84a64"
          ></path>
          <path
            d="M0 517L55 517L55 475L109 475L109 493L164 493L164 493L218 493L218 457L273 457L273 511L327 511L327 505L382 505L382 523L436 523L436 445L491 445L491 517L545 517L545 523L600 523L600 523L600 437L600 479L545 479L545 449L491 449L491 377L436 377L436 431L382 431L382 455L327 455L327 473L273 473L273 383L218 383L218 401L164 401L164 401L109 401L109 401L55 401L55 461L0 461Z"
            fill="#c53762"
          ></path>
          <path
            d="M0 601L55 601L55 601L109 601L109 601L164 601L164 601L218 601L218 601L273 601L273 601L327 601L327 601L382 601L382 601L436 601L436 601L491 601L491 601L545 601L545 601L600 601L600 601L600 521L600 521L545 521L545 515L491 515L491 443L436 443L436 521L382 521L382 503L327 503L327 509L273 509L273 455L218 455L218 491L164 491L164 491L109 491L109 473L55 473L55 515L0 515Z"
            fill="#b0235f"
          ></path>
        </svg>
        <span>Hannan</span>
      </a>
    </div>

    <div class="layout-topbar-actions">
      <!-- <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          (click)="toggleDarkMode()"
        >
          <i
            [ngClass]="{
              'pi ': true,
              'pi-moon': layoutService.isDarkTheme(),
              'pi-sun': !layoutService.isDarkTheme()
            }"
          ></i>
        </button>
      </div> -->

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <p-splitbutton
            [buttonDisabled]="true"
            dropdownIcon="pi pi-user"
            [model]="items"
            text
          />
        </div>
      </div>
    </div>
  </div>`
})
export class AppTopbar {
  private readonly authService = inject(AuthService);
  public layoutService = inject(LayoutService);

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        }
      }
    ];
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }
}
