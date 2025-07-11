import type { HeaderLink, SiteConfig } from '@/types/config';
const base = import.meta.env.BASE_URL;

export const siteConfig: SiteConfig = {
  siteTitle: 'My Site',
  siteDesc: 'My Site Description',
  siteUrl: 'https://example.com',
  siteType: 'website',
  siteLocale: 'ja_JP',
  siteIcon: '/favicon.svg',
  siteImg: '/ogp.png',
};

export const headerLink: HeaderLink[] = [
  { name: 'Home', url: `${base}` },
  { name: 'About', url: `${base}/about` },
  { name: 'Member', url: `${base}/member` },
];
