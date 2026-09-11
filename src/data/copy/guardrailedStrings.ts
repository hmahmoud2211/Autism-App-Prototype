/**
 * Single source of truth for every clinical-adjacent string in the app.
 * NUMU never diagnoses. Never add words like "diagnosis," "disorder,"
 * "autism," "delay," "normal/abnormal," or "pass/fail" anywhere in this file
 * or in screen copy (spec section 55).
 */

export const DISCLAIMER =
  'NUMU is an educational, non-clinical tool. It does not diagnose or replace professional evaluation. If you have concerns about your child’s development, consider discussing these observations with a qualified professional.';

export const ASSISTANT_DISCLAIMER =
  'NUMU provides educational and developmental support information and does not replace professional medical advice.';

export const NOT_SURE_PROMPT_TITLE = 'We’d like to understand this area better';

export function notSureExplanation(sectionTitle: string): string {
  return `Some of your answers suggest that ${sectionTitle} may be difficult to judge from everyday observation. A short activity can help NUMU gather additional information.`;
}

export const RESULTS_INTRO =
  'These results are not a diagnosis. NUMU combines your questionnaire answers with activity performance to identify developmental areas that may benefit from additional practice or observation.';

export const SUPPORT_AREAS_LEAD = 'Areas that may benefit from additional support';

export const PROFESSIONAL_NUDGE =
  'We recommend following a personalized activity plan and discussing any concerns with a qualified developmental professional.';

export function planRationale(areaLabel: string, gameTitle: string): string {
  return `${gameTitle} offers extra practice opportunities to help explore ${areaLabel.toLowerCase()} together.`;
}

export function tipRationale(areaLabel: string): string {
  return `A small daily habit to support ${areaLabel.toLowerCase()} at your child's own pace.`;
}

export const AREA_SCORE_LABEL_COPY: Record<'Developing Well' | 'Continue Practice' | 'May Benefit From Support', string> = {
  'Developing Well': 'Developing Well',
  'Continue Practice': 'Continue Practice',
  'May Benefit From Support': 'May Benefit From Support',
};

export const ASSESSMENT_COMPLETE_TITLE = 'Assessment Complete';

export function assessmentCompleteBody(childName: string): string {
  return `Thank you for completing ${childName}'s developmental check-in. We've combined your answers and completed activities to create a personalized developmental overview.`;
}

export const REPORT_EXPORT_MESSAGE = 'Report export will be available in the connected version.';
