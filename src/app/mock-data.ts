import { ActivityFeedGroup, GithubUser, RepoSummary } from './models/github.models';

/**
 * Fallback for the default profile only, used when the unauthenticated GitHub
 * REST API (60 req/hr per IP) is already rate-limited — keeps the demo usable
 * without requiring a personal access token. Mirrors the profile from the
 * assignment's reference screenshot; not used for any other username.
 */
export const MOCK_DEFAULT_USER: GithubUser = {
  login: 'shreeramk',
  name: 'Shreeram Kushwaha',
  avatar_url: 'https://avatars.githubusercontent.com/u/9345310?v=4',
  bio: 'Director of Engineering @UptimeAI\nPython, Angular, Javascript, NodeJS, MongoDB, Influx DB, TimescaleDB, Streamsets, Kafka, AWS, Azure, HTML5, CSS',
  company: '@UptimeAI',
  location: 'Bangalore, India',
  email: 'kushwaha.shreeram@gmail.com',
  blog: 'http://shreeramk.com',
  twitter_username: 'pom_fret',
  followers: 11,
  following: 3,
  public_repos: 31,
  html_url: 'https://github.com/shreeramk',
};

export const MOCK_POPULAR_REPOS: RepoSummary[] = [
  {
    name: 'Complete-Python-3-Bootcamp',
    visibility: 'Public',
    forkedFrom: 'Pierian-Data/Complete-Python-3-Bootcamp',
    description: 'Course Files for Complete Python 3 Bootcamp Course on Udemy',
    language: 'Jupyter Notebook',
    languageColor: '#DA5B0B',
  },
  {
    name: 'flutter_login_ui',
    visibility: 'Public',
    forkedFrom: 'MarcusNg/flutter_login_ui',
    description: 'https://youtu.be/6kaEbTfb444',
    language: 'Dart',
    languageColor: '#00B4AB',
  },
  {
    name: 'gitignore',
    visibility: 'Public',
    forkedFrom: 'github/gitignore',
    description: 'A collection of useful .gitignore templates',
  },
  {
    name: 'node-opcua-logger',
    visibility: 'Public',
    forkedFrom: 'coussej/node-opcua-logger',
    description: 'An OPCUA Client for logging data to InfluxDB!',
    language: 'JavaScript',
    languageColor: '#F1E05A',
  },
  {
    name: 'kafkajs',
    visibility: 'Public',
    forkedFrom: 'tulios/kafkajs',
    description: 'A modern Apache Kafka client for node.js',
    language: 'JavaScript',
    languageColor: '#F1E05A',
  },
  {
    name: 'node-opcua-1',
    visibility: 'Public',
    forkedFrom: 'node-opcua/node-opcua',
    description: 'an implementation of a OPC UA stack fully written in javascript and nodejs',
    language: 'TypeScript',
    languageColor: '#3178C6',
  },
];

export const MOCK_ACHIEVEMENTS = [
  { label: 'Pull Shark', emoji: '🦈', count: null as number | null },
  { label: 'YOLO', emoji: '🎲', count: null },
  { label: 'Pair Extraordinaire', emoji: '💧', count: 4 },
];

export const MOCK_ACTIVITY_OVERVIEW = {
  contributedRepos: ['UptimeAI/uptime_webapp', 'UptimeAI/uptime_server', 'UptimeAI/uptime_ml'],
  otherReposCount: 13,
  commitsPercent: 83,
  pullRequestsPercent: 17,
  issuesPercent: 0,
  codeReviewPercent: 0,
};

export const MOCK_CONTRIBUTION_ACTIVITY: ActivityFeedGroup[] = [
  {
    month: 'October 2025',
    entries: [
      { icon: 'commit', summary: 'Created 56 commits in 11 repositories' },
      {
        icon: 'pr',
        summary: 'Opened 29 pull requests in 5 repositories',
        breakdown: [
          { repo: 'UptimeAI/uptime_webapp', status: '16 merged · 1 open' },
          { repo: 'UptimeAI/uptime_ml', status: '6 merged' },
          { repo: 'UptimeAI/uptime_scripts', status: '4 merged' },
          { repo: 'UptimeAI/uptime_engine', status: '1 merged' },
          { repo: 'UptimeAI/uptime_ml_encrypted', status: '1 merged' },
        ],
      },
    ],
  },
  {
    month: 'September 2025',
    entries: [
      { icon: 'commit', summary: 'Created 41 commits in 8 repositories' },
      {
        icon: 'pr',
        summary: 'Opened 17 pull requests in 4 repositories',
        breakdown: [
          { repo: 'UptimeAI/uptime_webapp', status: '9 merged' },
          { repo: 'UptimeAI/uptime_server', status: '5 merged · 1 open' },
          { repo: 'UptimeAI/uptime_ml', status: '2 merged' },
        ],
      },
      { icon: 'issue', summary: 'Opened 3 issues in 2 repositories' },
    ],
  },
];
