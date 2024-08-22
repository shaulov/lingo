export enum AppRoutes {
	Courses = '/courses',
	Learn = '/learn',
};

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
