type Sidebarlink = {
  label: string;
  href: string;
  icon: string;
}

export const sidebarLinks: Array<Sidebarlink> = [
  {
    label: 'Companies',
    href: '/company',
    icon: 'fa-building'
  },
  {
    label: 'Projects',
    href: '/project',
    icon: 'fa-diagram-project'
  }
]