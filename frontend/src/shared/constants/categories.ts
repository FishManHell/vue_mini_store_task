export const CATEGORY = {
  EBOOK: 'ebook',
  SOFTWARE_LICENSE: 'software_license',
  ONLINE_COURSE: 'online_course',
  TEMPLATE: 'template',
} as const

export type Category = (typeof CATEGORY)[keyof typeof CATEGORY]
