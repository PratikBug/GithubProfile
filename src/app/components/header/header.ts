import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  @Input() avatarUrl: string | null = null;
  @Input() username = '';
  @Output() searchUsername = new EventEmitter<string>();

  onSearch(value: string): void {
    const trimmed = value.trim();
    if (trimmed) {
      this.searchUsername.emit(trimmed);
    }
  }
}
