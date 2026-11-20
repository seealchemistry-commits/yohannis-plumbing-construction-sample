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
