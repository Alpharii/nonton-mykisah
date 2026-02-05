import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/index.tsx'),
    route('detail/:slug', 'routes/detail.tsx'),
    route('episode/:slug', 'routes/episode.tsx'),
  ]),
] satisfies RouteConfig;
