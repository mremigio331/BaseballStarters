import dayjs from 'dayjs';

export const FAMILY_BET_TEAM = {
    id: '10',
    uid: 's:1~l:10~t:10',
    slug: 'new-york-yankees',
    abbreviation: 'NYY',
    displayName: 'New York Yankees',
    shortDisplayName: 'Yankees',
    name: 'Yankees',
    nickname: 'New York',
    location: 'New York',
    color: '132448',
    alternateColor: 'c4ced4',
    isActive: true,
    isAllStar: false,
    logos: [
        {
            href: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png',
            alt: '',
            rel: ['full', 'default'],
            width: 500,
            height: 500,
        },
        {
            href: 'https://a.espncdn.com/i/teamlogos/mlb/500-dark/nyy.png',
            alt: '',
            rel: ['full', 'dark'],
            width: 500,
            height: 500,
        },
        {
            href: 'https://a.espncdn.com/i/teamlogos/mlb/500/scoreboard/nyy.png',
            alt: '',
            rel: ['full', 'scoreboard'],
            width: 500,
            height: 500,
        },
        {
            href: 'https://a.espncdn.com/i/teamlogos/mlb/500-dark/scoreboard/nyy.png',
            alt: '',
            rel: ['full', 'scoreboard', 'dark'],
            width: 500,
            height: 500,
        },
    ],
    links: [
        {
            language: 'en-US',
            rel: ['clubhouse', 'desktop', 'team'],
            href: 'https://www.espn.com/mlb/team/_/name/nyy/new-york-yankees',
            text: 'Clubhouse',
            shortText: 'Clubhouse',
            isExternal: false,
            isPremium: false,
            isHidden: false,
        },
        {
            language: 'en-US',
            rel: ['roster', 'desktop', 'team'],
            href: 'http://www.espn.com/mlb/team/roster/_/name/nyy/new-york-yankees',
            text: 'Roster',
            shortText: 'Roster',
            isExternal: false,
            isPremium: false,
            isHidden: false,
        },
        {
            language: 'en-US',
            rel: ['stats', 'desktop', 'team'],
            href: 'http://www.espn.com/mlb/team/stats/_/name/nyy/new-york-yankees',
            text: 'Statistics',
            shortText: 'Statistics',
            isExternal: false,
            isPremium: false,
            isHidden: false,
        },
        {
            language: 'en-US',
            rel: ['schedule', 'desktop', 'team'],
            href: 'https://www.espn.com/mlb/team/schedule/_/name/nyy',
            text: 'Schedule',
            shortText: 'Schedule',
            isExternal: false,
            isPremium: false,
            isHidden: false,
        },
        {
            language: 'en-US',
            rel: ['tickets', 'desktop', 'team'],
            href: 'https://www.vividseats.com/new-york-yankees-tickets--sports-mlb-baseball/performer/607?wsUser=717',
            text: 'Tickets',
            shortText: 'Tickets',
            isExternal: true,
            isPremium: false,
            isHidden: false,
        },
        {
            language: 'en-US',
            rel: ['depthchart', 'desktop', 'team'],
            href: 'https://www.espn.com/mlb/team/depth/_/name/nyy',
            text: 'Depth Chart',
            shortText: 'Depth Chart',
            isExternal: false,
            isPremium: false,
            isHidden: false,
        },
    ],
};

export const FAMILY_BET_SELECTED_PLAYERS = ['Aaron Judge', 'Giancarlo Stanton', 'Juan Soto'];

export const FAMILY_BET_START_DATE = dayjs('2024-03-01').startOf('day');
const today = dayjs().startOf('day');
const endDate2024Season = dayjs('2024-09-29').startOf('day');
export const FAMILY_BET_END_DATE = today.isBefore(endDate2024Season) ? today : endDate2024Season;

export const FAMILY_BET_REGULAR_SEASON = true;
export const FAMILY_BET_POST_SEASON = false;
export const FAMILY_BET_PRE_SEASON = false;
