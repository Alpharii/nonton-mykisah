export type OngoingAndCompletedAnime = {
  title: string;
  link: string;
  slug: string;
  episode: string;
  date: string;
  day: string;
  thumbnail: string;
};

export type OngoingAndCompletedResponse = {
  success: boolean;
  page: number;
  total_data: number;
  pagination: {
    available_pages: number[];
    next_page?: string;
  };
  data: OngoingAndCompletedAnime[];
};
