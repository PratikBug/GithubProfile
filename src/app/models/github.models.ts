export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface RepoSummary {
  name: string;
  visibility: 'Public' | 'Private';
  forkedFrom?: string;
  description?: string;
  language?: string;
  languageColor?: string;
}

export interface ActivityFeedGroup {
  month: string;
  entries: {
    icon: 'commit' | 'pr' | 'issue';
    summary: string;
    breakdown?: { repo: string; status: string }[];
  }[];
}
