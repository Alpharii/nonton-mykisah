import type { Mirror } from './Mirror';

export type DetailAnimeResponse = {
  title: string;
  streaming_title: string;
  thumbnail: string;
  synopsis: string;
  info: {
    judul: string;
    japanese: string;
    skor: string;
    produser: string;
    tipe: string;
    status: string;
    total_episode: string;
    durasi: string;
    tanggal_rilis: string;
    studio: string;
    genres: string[];
  };
  mirrors: Mirror[];
  episodes: {
    title: string;
    link: string;
    slug: string;
    release_date: string;
  }[];
};
