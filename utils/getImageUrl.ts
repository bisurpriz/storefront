import { IMAGE_URL } from '@/contants/urls';

export function getImageUrlFromPath(path: string): string {
  return `${IMAGE_URL}/${path}`;
}
