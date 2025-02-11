export enum AppRoutes {
	Courses = '/courses',
	Learn = '/learn',
	Lesson = '/lesson',
	Quests = '/quests',
	Leaderboard = '/leaderboard',
	Shop = '/shop',
}

export const LANGUAGES = [
	{ id: 'croatian', name: 'Croatian', src: '/images/flags/hr.svg' },
	{ id: 'spanish', name: 'Spanish', src: '/images/flags/es.svg' },
	{ id: 'french', name: 'French', src: '/images/flags/fr.svg' },
	{ id: 'italian', name: 'Italian', src: '/images/flags/it.svg' },
	{ id: 'japanese', name: 'Japanese', src: '/images/flags/jp.svg' },
];

export const SidebarItems = [
	{
		id: 'learn',
		label: 'Learn',
		iconSrc: '/images/icons/learn.svg',
		href: '/learn',
	},
  {
		id: 'leaderboard',
		label: 'Leaderboard',
		iconSrc: '/images/icons/leaderboard.svg',
		href: '/leaderboard',
	},
  {
		id: 'quests',
		label: 'Quests',
		iconSrc: '/images/icons/quests.svg',
		href: '/quests',
	},
  {
		id: 'shop',
		label: 'Shop',
		iconSrc: '/images/icons/shop.svg',
		href: '/shop',
	},
];

export const DEFAULT_HEART_COUNT = 5;
export const DEFAULT_ADDING_POINTS = 10;
export const CYCLE_LENGTH = 8;
export const RIGHT_INDENT_CONST = 40;
export const POINTS_TO_REFILL = 10;
export const DAY_IN_MS = 86_400_000;

export enum ChallengeTypes {
	Assist = 'ASSIST',
	Select = 'SELECT',
}

export enum ErrorMessages {
	Hearts = 'hearts',
	Practice = 'practice',
	Subscription = 'subscription',
}

export enum QuizStatuses {
	Correct = 'correct',
	None = 'none',
	Wrong = 'wrong',
	Completed = 'completed',
}