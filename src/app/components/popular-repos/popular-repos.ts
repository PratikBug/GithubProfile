import { Component } from '@angular/core';
import { MOCK_POPULAR_REPOS } from '../../mock-data';

@Component({
  selector: 'app-popular-repos',
  standalone: true,
  imports: [],
  templateUrl: './popular-repos.html',
  styleUrl: './popular-repos.css',
})
export class PopularReposComponent {
  readonly repos = MOCK_POPULAR_REPOS;
}
