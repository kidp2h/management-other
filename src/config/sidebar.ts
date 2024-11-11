import { Bookmark, LayoutGrid, Newspaper } from 'lucide-react';

import type { Group } from '@/components/common/sidebar/menu';

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: 'Chính',
      menus: [
        {
          href: '/',
          label: 'Bảng điều khiển',
          active: pathname === '/',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Đơn',
      menus: [
        {
          href: '#',
          label: 'Tiếp dân',
          active: pathname.includes('/reception'),
          icon: Newspaper,
          submenus: [
            {
              href: '/reception',
              label: 'Tiếp dân thường xuyên',
            },
          ],
        },
        {
          href: '#',
          label: 'Quản lý',
          active:
            pathname.includes('/applications') ||
            pathname.includes('/users') ||
            pathname.includes('/roles') ||
            pathname.includes('/permissions'),
          icon: Bookmark,
          submenus: [
            {
              href: '/applications',
              label: 'Quản lý đơn',
            },
            {
              href: '/users',
              label: 'Quản lý tài khoản',
            },
            {
              href: '/roles',
              label: 'Quản lý vai trò',
            },
            {
              href: '/permissions',
              label: 'Quản lý quyền',
            },
          ],
        },
      ],
    },
  ];
}
