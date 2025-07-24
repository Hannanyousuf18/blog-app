import { Component } from '@angular/core';
import { NotificationsWidget } from '../pages/dashboard/components/notificationswidget';
import { StatsWidget } from '../pages/dashboard/components/statswidget';
import { RecentSalesWidget } from '../pages/dashboard/components/recentsaleswidget';
import { BestSellingWidget } from '../pages/dashboard/components/bestsellingwidget';
import { RevenueStreamWidget } from '../pages/dashboard/components/revenuestreamwidget';

@Component({
  selector: 'app-dashboard',
  imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <app-stats-widget class="contents" />
      <div class="col-span-12 xl:col-span-6">
        <app-recent-sales-widget />
        <app-best-selling-widget />
      </div>
      <div class="col-span-12 xl:col-span-6">
        <app-revenue-stream-widget />
        <app-notifications-widget />
      </div>
    </div>
  `
})
export class Dashboard {}
