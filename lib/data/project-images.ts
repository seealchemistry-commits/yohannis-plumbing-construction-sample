import type { StaticImageData } from 'next/image';
import handoverCertTowerImg from '@/src/assets/images/handover_cert_tower_1795663263496.jpg';
import handoverCertVillasImg from '@/src/assets/images/handover_cert_villas_1795663263905.jpg';
import projectCompletingApartmentsImg from '@/src/assets/images/project_completing_apartments_1795663263956.jpg';
import projectCompletingPlazaImg from '@/src/assets/images/project_completing_plaza_1795663264834.jpg';
import type { ProjectImageKey } from './projects';

export const PROJECT_IMAGE_MAP: Record<ProjectImageKey, StaticImageData> = {
  handover_cert_tower: handoverCertTowerImg,
  handover_cert_villas: handoverCertVillasImg,
  project_completing_apartments: projectCompletingApartmentsImg,
  project_completing_plaza: projectCompletingPlazaImg,
};
