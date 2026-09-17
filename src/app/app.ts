import { Component, OnInit, signal } from '@angular/core';
import { GithubService } from './services/github.service';
import { GithubUser, ContributionsResponse } from './models/github.models';
import { MOCK_DEFAULT_USER } from './mock-data';
import { HeaderComponent } from './components/header/header';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TabNavComponent, TabId } from './components/tab-nav/tab-nav';
import { PopularReposComponent } from './components/popular-repos/popular-repos';
import { ContributionGraphComponent } from './components/contribution-graph/contribution-graph';
import { ActivityOverviewComponent } from './components/activity-overview/activity-overview';
import { ContributionActivityComponent } from './components/contribution-activity/contribution-activity';
import { EmptyTabComponent } from './components/empty-tab/empty-tab';

const DEFAULT_USERNAME = 'shreeramk';
const EARLIEST_YEAR = 2013;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    TabNavComponent,
    PopularReposComponent,
    ContributionGraphComponent,
    ActivityOverviewComponent,
    ContributionActivityComponent,
    EmptyTabComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly username = signal(DEFAULT_USERNAME);
  readonly user = signal<GithubUser | null>(null);
  readonly userLoading = signal(true);

  readonly activeTab = signal<TabId>('overview');

  readonly year = signal(new Date().getFullYear());
  readonly contributions = signal<ContributionsResponse | null>(null);
  readonly contributionsLoading = signal(true);

  readonly years: number[] = Array.from(
    { length: new Date().getFullYear() - EARLIEST_YEAR + 1 },
    (_, i) => new Date().getFullYear() - i,
  );

  constructor(private github: GithubService) {}

  ngOnInit(): void {
    this.loadUser(this.username());
    this.loadContributions(this.username(), this.year());
  }

  onSearchUsername(name: string): void {
    this.username.set(name);
    this.loadUser(name);
    this.year.set(new Date().getFullYear());
    this.loadContributions(name, this.year());
  }

  onTabChange(tab: TabId): void {
    this.activeTab.set(tab);
  }

  onYearChange(year: number): void {
    this.year.set(year);
    this.loadContributions(this.username(), year);
  }

  private loadUser(username: string): void {
    this.userLoading.set(true);
    this.github.getUser(username).subscribe((user) => {
      const fallback = username === DEFAULT_USERNAME ? MOCK_DEFAULT_USER : null;
      this.user.set(user ?? fallback);
      this.userLoading.set(false);
    });
  }

  private loadContributions(username: string, year: number): void {
    this.contributionsLoading.set(true);
    this.github.getContributions(username, year).subscribe((data) => {
      this.contributions.set(data ?? this.github.generateMockContributions(year));
      this.contributionsLoading.set(false);
    });
  }
}
