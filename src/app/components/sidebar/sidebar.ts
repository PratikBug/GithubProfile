import { Component, Input } from '@angular/core';
import { GithubUser } from '../../models/github.models';
import { MOCK_ACHIEVEMENTS } from '../../mock-data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Input() user: GithubUser | null = null;
  @Input() loading = false;

  readonly achievements = MOCK_ACHIEVEMENTS;

  get twitterHandle(): string | null {
    return this.user?.twitter_username ? `@${this.user.twitter_username}` : null;
  }

  get orgInitial(): string {
    return (this.user?.company ?? '').replace(/^@/, '').charAt(0);
  }
}
