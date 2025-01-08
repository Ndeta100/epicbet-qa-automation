import { SportCategory } from '../src/types/sports.types';

export const SPORTS_DATA = {
    CATEGORIES: [
        'football',
        'basketball',
        'iceHockey',
        'tennis',
        'americanFootball',
        'boxing',
        'handball',
        'esports'
    ] as SportCategory[],
    URL_PATHS: {
        football: '/sports/football',
        basketball: '/sports/basketball',
        tennis: '/sports/tennis',
        americanFootball: '/sports/american-football',
        iceHockey: '/sports/ice-hockey',
        esports: '/sports/esports/counter-strike-2',
        boxing: '/sports/boxing',
        handball: '/sports/handball'
    } as Record<SportCategory, string>
};
