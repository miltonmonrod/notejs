import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Administración',
    main: [
      {
        state: 'crearcampos',
        short_label: 'B',
        name: 'Crear campos',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      },
      {
        state: 'confcampos',
        short_label: 'B',
        name: 'Configurar campos',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      },
    ],
  },
  {
    label: 'Reporte',
    main: [
      {
        state: 'trazaxproducto',
        short_label: 'B',
        name: 'Reporte traza por producto',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      },
      {
        state: 'historial',
        short_label: 'B',
        name: 'Historial de reportes por producto',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      }
    ],
  },
  {
    label: 'Reporte disponibilidad',
    main: [
      {
        state: 'repdisponibilidad',
        short_label: 'B',
        name: 'Reportar',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      },
      {
        state: 'repdispsolpen',
        short_label: 'B',
        name: 'Solicitudes pendientes',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      },
      {
        state: 'repsolicitudes',
        short_label: 'B',
        name: 'Reporte solicitudes',
        type: 'link',
        icon: 'ti-layout-grid2-alt',
      }
    ],
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
