export interface v1BeatmapObject {
  approved: number
  approved_date: string
  artist: string
  artist_unicode: string
  audio_unavailable: number,
  beatmap_id: number,
  beatmapset_id: number,
  bpm: number,
  count_normal: number,
  count_slider: number,
  count_number: number,
  creator: string,
  creator_id: number,
  diff_aim: number,
  diff_approach: number,
  diff_drain: number,
  diff_overall: number,
  diff_size: number,
  diff_speed: number,
  difficultyrating: number,
  download_unavailable: number,
  favourite_count: number,
  file_md5: string,
  genre_id: number,
  hit_length: number,
  language_id: number,
  last_update: string,
  max_combo: number,
  mode: number,
  packs: string,
  passcount: number,
  playcount: number,
  rating: number,
  source: string,
  storyboard: number,
  submit_date: string,
  tags: string,
  title: string,
  title_unicode: string,
  total_length: number,
  version: string,
  video: number
}

export interface BeatmapScoreObject {
  position: number
  score: {
    id: number
    best_id: number
    user_id: number
    accuracy: number
    mods: string[]
    score: number
    max_combo: number
    perfect: boolean
    statistics: {
      count_50: number,
      count_100: number,
      count_300: number,
      count_geki: number,
      count_katu: number,
      count_miss: number
    },
    passed: boolean,
    pp: string,
    rank: number,
    created_at: number,
    mode: number,
    mode_int: number,
    replay: boolean
  }
}

export interface Kudosu {
  total: number;
  available: number;
}

export interface Country {
  code: string;
  name: string;
}

export interface Cover {
  custom_url: string;
  url: string;
  id?: any;
}

export interface Badge {
  awarded_at: Date;
  description: string;
  image_url: string;
  url: string;
}

export interface Group {
  id: number;
  identifier: string;
  name: string;
  short_name: string;
  description: string;
  colour: string;
}

export interface MonthlyPlaycount {
  start_date: string;
  count: number;
}

export interface Page {
  html: string;
  raw: string;
}

export interface ReplaysWatchedCount {
  start_date: string;
  count: number;
}

export interface Level {
  current: number;
  progress: number;
}

export interface GradeCounts {
  ss: number;
  ssh: number;
  s: number;
  sh: number;
  a: number;
}

export interface Rank {
  global: number;
  country: number;
}

export interface Statistics {
  level: Level;
  pp: number;
  global_rank: number;
  ranked_score: number;
  hit_accuracy: number;
  play_count: number;
  play_time: number;
  total_score: number;
  total_hits: number;
  maximum_combo: number;
  replays_watched_by_others: number;
  is_ranked: boolean;
  grade_counts: GradeCounts;
  rank: Rank;
}

export interface UserAchievement {
  achieved_at: Date;
  achievement_id: number;
}

export interface RankHistory {
  mode: string;
  data: number[];
}

export interface Player {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: Date;
  pm_friends_only: boolean;
  profile_colour: string;
  username: string;
  cover_url: string;
  discord: string;
  has_supported: boolean;
  interests?: any;
  join_date: Date;
  kudosu: Kudosu;
  location?: any;
  max_blocks: number;
  max_friends: number;
  occupation?: any;
  playmode: string;
  playstyle: string[];
  post_count: number;
  profile_order: string[];
  title?: any;
  twitter: string;
  website: string;
  country: Country;
  cover: Cover;
  is_restricted: boolean;
  account_history: any[];
  active_tournament_banner?: any;
  badges: Badge[];
  favourite_beatmapset_count: number;
  follower_count: number;
  graveyard_beatmapset_count: number;
  groups: Group[];
  loved_beatmapset_count: number;
  monthly_playcounts: MonthlyPlaycount[];
  page: Page;
  pending_beatmapset_count: number;
  previous_usernames: any[];
  ranked_beatmapset_count: number;
  replays_watched_counts: ReplaysWatchedCount[];
  scores_first_count: number;
  statistics: Statistics;
  support_level: number;
  user_achievements: UserAchievement[];
  rank_history: RankHistory;
}
