import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/index.tsx'),
    route('ongoing', 'routes/ongoing.tsx'),
    route('completed', 'routes/completed.tsx'),
    route('detail/:slug', 'routes/detail.tsx'),
    route('episode/:slug', 'routes/episode.tsx'),
    route('search', 'routes/search.tsx'),
  ]),
] satisfies RouteConfig;
