import { CATEGORY_ORDER, CATEGORY_THEME } from '@/constants/categories';

// Re-exported for screens that just want the ordered theme list, keeping the
// "developmentAreas" data-file name the spec's folder structure expects.
export const DEVELOPMENT_AREAS = CATEGORY_ORDER.map((id) => CATEGORY_THEME[id]);
