import type { StaticImageData } from 'next/image';
import heroPlumbingImg from '@/src/assets/images/hero_plumbing_work_1795047596350.jpg';
import waterPumpImg from '@/src/assets/images/luxury_showroom_pump_1795118213341.jpg';
import siteEngineerImg from '@/src/assets/images/editorial_site_engineer_1795047598314.jpg';

export const MEDIA_ASSETS = {
  hero_plumbing: heroPlumbingImg,
  ppr_pipes: '/assets/aistudio/image_a5236da2.png',
  brass_valves: '/assets/aistudio/image_0bcc8c56.png',
  water_pump: waterPumpImg,
  mixer_faucet: '/assets/aistudio/image_5218e59d.png',
  pvc_fittings_kit: '/assets/aistudio/image_25fac781.png',
  brass_fittings_board: '/assets/aistudio/image_f5446c19.png',
  pipes_showcase: '/assets/aistudio/image_b7fa1cb6.png',
  site_engineer: siteEngineerImg,
} satisfies Record<string, StaticImageData | string>;

export type MediaAssetKey = keyof typeof MEDIA_ASSETS;

export interface HeroCarouselSlideConfig {
  id: string;
  /** Matches CSS background class in app/globals.css (.parallax-hero-slide-*) */
  cssClass: string;
  /** Sample high-resolution plumbing photo path under /public */
  imageUrl: string;
  topic: string;
}

/**
 * Sample high-resolution plumbing photos used by the full-bleed Hero carousel.
 * To use your own photography, replace the files under /public/assets/slides/
 * or update the corresponding URLs in app/globals.css and this config array.
 */
export const HERO_CAROUSEL_SLIDES: readonly HeroCarouselSlideConfig[] = [
  {
    id: 'SLIDE-01',
    cssClass: 'parallax-hero-slide-0',
    imageUrl: '/assets/slides/slide-1.jpg',
    topic: 'Modern Copper & Brass Pipe Manifold',
  },
  {
    id: 'SLIDE-02',
    cssClass: 'parallax-hero-slide-1',
    imageUrl: '/assets/slides/slide-2.jpg',
    topic: 'Commercial PP-R & Manifold Installation',
  },
  {
    id: 'SLIDE-03',
    cssClass: 'parallax-hero-slide-2',
    imageUrl: '/assets/slides/slide-3.jpg',
    topic: 'Luxury Bathroom Fixture & Mixer Setup',
  },
  {
    id: 'SLIDE-04',
    cssClass: 'parallax-hero-slide-3',
    imageUrl: '/assets/slides/slide-4.jpg',
    topic: 'Water Pump & Technical Dispatch System',
  },
];

export const PARALLAX_BANNER_BACKGROUNDS = {
  statsBanner: {
    cssClass: 'parallax-stats-bg',
    imageUrl: '/assets/slides/slide-2.jpg',
  },
  preFooterCtaBanner: {
    cssClass: 'parallax-cta-bg',
    imageUrl: '/assets/slides/about-materials.jpg',
  },
} as const;

export interface FeaturedVideoConfigItem {
  id: 'VID-01' | 'VID-02' | 'VID-03';
  /** Local MP4/WebM path under /public or external CDN video URL */
  src: string;
  /** Poster & clickable thumbnail image URL */
  poster: string;
}

/**
 * Centralized Video Showcase config array ("Tirat Plumbing Videos" / "See Our Work in Action").
 * To replace sample clips with your own recorded project videos, simply swap `src` and `poster` below.
 */
export const FEATURED_VIDEOS_CONFIG: readonly FeaturedVideoConfigItem[] = [
  {
    id: 'VID-01',
    src: '/assets/videos/video-manifold-ppr.mp4',
    poster: '/assets/aistudio/image_e54a7d54.png',
  },
  {
    id: 'VID-02',
    src: '/assets/videos/video-booster-pump.mp4',
    poster: '/assets/slides/pump-showroom.jpg',
  },
  {
    id: 'VID-03',
    src: '/assets/videos/video-sanitary-fixture.mp4',
    poster: '/assets/slides/slide-3.jpg',
  },
];
