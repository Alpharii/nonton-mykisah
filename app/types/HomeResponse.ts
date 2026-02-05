import type { Anime } from './Anime';

export type HomeResponse = {
  ongoing: {
    count: number;
    data: Anime[];
  };
  completed: {
    count: number;
    data: Anime[];
  };
};
