import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ContributionsResponse, GithubUser } from '../models/github.models';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly usersApi = 'https://api.github.com/users';
  // Unofficial public contributions API (GitHub's own REST API does not expose
  // the contribution calendar; it is only available via authenticated GraphQL).
  private readonly contributionsApi = 'https://github-contributions-api.jogruber.de/v4';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<GithubUser | null> {
    return this.http
      .get<GithubUser>(`${this.usersApi}/${username}`)
      .pipe(catchError(() => of(null)));
  }

  getContributions(username: string, year: number | 'last'): Observable<ContributionsResponse | null> {
    return this.http
      .get<ContributionsResponse>(`${this.contributionsApi}/${username}?y=${year}`)
      .pipe(catchError(() => of(null)));
  }

  /** Deterministic offline fallback so the heat map always renders something. */
  generateMockContributions(year: number): ContributionsResponse {
    const contributions: ContributionsResponse['contributions'] = [];
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year, 11, 31));
    let seed = year;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    let total = 0;
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      const r = rand();
      const count = r > 0.55 ? Math.floor(r * 12) : 0;
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
      total += count;
      contributions.push({ date: d.toISOString().slice(0, 10), count, level: level as 0 | 1 | 2 | 3 | 4 });
    }

    return { total: { [year]: total }, contributions };
  }
}
