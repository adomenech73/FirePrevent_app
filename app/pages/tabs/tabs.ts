import {Page} from 'ionic-angular';
import {PageDashboard} from '../dashboard-tab/dashboard';
import {PageSources} from '../sources-tab/sources';
import {PageOptions} from '../options-tab/options';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  dashboardRoot: any = PageDashboard;
  sourcesRoot: any = PageSources;
  optionsRoot: any = PageOptions;
}
