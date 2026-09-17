import { Component, signal } from '@angular/core';
import { MOCK_CONTRIBUTION_ACTIVITY } from '../../mock-data';

@Component({
  selector: 'app-contribution-activity',
  standalone: true,
  imports: [],
  templateUrl: './contribution-activity.html',
  styleUrl: './contribution-activity.css',
})
export class ContributionActivityComponent {
  private readonly allGroups = MOCK_CONTRIBUTION_ACTIVITY;
  readonly visibleCount = signal(1);

  get visibleGroups() {
    return this.allGroups.slice(0, this.visibleCount());
  }

  get hasMore(): boolean {
    return this.visibleCount() < this.allGroups.length;
  }

  showMore(): void {
    this.visibleCount.set(this.allGroups.length);
  }
}
