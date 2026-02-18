export type EpisodeHistory = {
  slug: string;
  title: string;
  episode: string;
  episodeSlug: string;
  thumbnail: string;
  link: string;
  date: string;
};

export type AnimeHistory = {
  title: string;
  slug: string;
  thumbnail: string;
  lastEpisode: EpisodeHistory;
};