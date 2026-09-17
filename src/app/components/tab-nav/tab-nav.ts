import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TabId = 'overview' | 'repositories' | 'projects' | 'packages' | 'stars';

interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

@Component({
  selector: 'app-tab-nav',
  standalone: true,
  imports: [],
  templateUrl: './tab-nav.html',
  styleUrl: './tab-nav.css',
})
export class TabNavComponent {
  @Input() activeTab: TabId = 'overview';
  @Input() set repoCount(value: number | null) {
    this.tabs[1].count = value ?? undefined;
  }
  @Output() tabChange = new EventEmitter<TabId>();

  tabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'repositories', label: 'Repositories' },
    { id: 'projects', label: 'Projects' },
    { id: 'packages', label: 'Packages', count: 5 },
    { id: 'stars', label: 'Stars', count: 6 },
  ];

  select(tab: TabId): void {
    this.tabChange.emit(tab);
  }
}
