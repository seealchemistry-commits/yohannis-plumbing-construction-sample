import type { StaticImageData } from 'next/image';
import heroPlumbingImg from '@/src/assets/images/hero_plumbing_work_1795047596350.jpg';
import pprPipesImg from '@/src/assets/images/product_ppr_pipes_1795047596069.jpg';
import brassValvesImg from '@/src/assets/images/product_brass_valves_1795047596987.jpg';
import waterPumpImg from '@/src/assets/images/luxury_showroom_pump_1795118213341.jpg';
import mixerFaucetImg from '@/src/assets/images/product_mixer_faucet_1795047597410.jpg';
import siteEngineerImg from '@/src/assets/images/editorial_site_engineer_1795047598314.jpg';

export const MEDIA_ASSETS = {
  hero_plumbing: heroPlumbingImg,
  ppr_pipes: pprPipesImg,
  brass_valves: brassValvesImg,
  water_pump: waterPumpImg,
  mixer_faucet: mixerFaucetImg,
  site_engineer: siteEngineerImg,
} satisfies Record<string, StaticImageData>;

export type MediaAssetKey = keyof typeof MEDIA_ASSETS;
