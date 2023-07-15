type Sidebarlink = {
  label: string;
  href: string;
  icon: string;
}

export const sidebarLinks: Array<Sidebarlink> = [
  {
    label: 'Companies',
    href: '/companies',
    icon: 'fa-building'
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: 'fa-diagram-project'
  }
]