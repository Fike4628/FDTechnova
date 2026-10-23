/**
 * Central course data — used across public pages, student pages, and admin pages.
 * Images reference files in /public/images/courses/.
 */

export const COURSE_IMAGE_MAP = {
  'web-design':       '/images/courses/web_design.png',
  'video-editing':    '/images/courses/vidieo_diting.png',
  'graphic-design':   '/images/courses/graphic_design.png',
  'basic-computer':   '/images/courses/basic_computer_skill.png',
  'english-language': '/images/courses/english_language.png',
}

export const COURSE_COLOR_MAP = {
  'web-design':       { bg: 'bg-blue-500',    light: 'bg-blue-50',    text: 'text-blue-600'    },
  'video-editing':    { bg: 'bg-purple-500',  light: 'bg-purple-50',  text: 'text-purple-600'  },
  'graphic-design':   { bg: 'bg-pink-500',    light: 'bg-pink-50',    text: 'text-pink-600'    },
  'basic-computer':   { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
  'english-language': { bg: 'bg-amber-500',   light: 'bg-amber-50',   text: 'text-amber-600'   },
}

/**
 * Returns the thumbnail path for a course ID.
 * Falls back to a placeholder string if not found.
 */
export function getCourseImage(courseId) {
  return COURSE_IMAGE_MAP[courseId] || '/images/courses/hero.png'
}

/**
 * Returns colour classes { bg, light, text } for a course ID.
 */
export function getCourseColors(courseId) {
  return COURSE_COLOR_MAP[courseId] || { bg: 'bg-primary-500', light: 'bg-primary-50', text: 'text-primary-600' }
}
