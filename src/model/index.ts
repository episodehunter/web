import { UpcomingEpisodes } from './episode';
import { Show } from './show';

export * from './episode';
export * from './show';
export * from './watched-episode';
export type ShowAndUpcomingEpisodes = { show: Show, upcomingEpisodes: UpcomingEpisodes }
