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

const MENUITEMS_ADMIN = [
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

const MENUITEMS_EVALUADOR_MED = [
  {
    label: 'Reporte disponibilidad',
    main: [
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

const MENUITEMS_DEFAULT = [
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
      }
    ],
  }
];


@Injectable()
export class MenuItems {
  getAll(roles): Menu[] {
    if(roles != null) {
      for(var i = 0; i < roles.length; i++) {
        var valor = roles[i];
        if(valor === 'view-profile' && roles.length === 1)
          return MENUITEMS_DEFAULT;
        if(valor === "Administrador")
          return MENUITEMS_ADMIN;
        else if(valor === "Evaluador Medicamentos")
          return MENUITEMS_EVALUADOR_MED;
        else
          return MENUITEMS_DEFAULT;
      }
    }
    else
      return [];
  }
}
