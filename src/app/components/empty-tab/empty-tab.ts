import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-tab',
  standalone: true,
  imports: [],
  templateUrl: './empty-tab.html',
  styleUrl: './empty-tab.css',
})
export class EmptyTabComponent {
  @Input() label = '';
}
