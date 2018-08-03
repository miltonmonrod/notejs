import { PaConfigcamposreporte } from "./PaConfigcamposreporte";

export class PaReportetipoproducto {
    idreportetipoproducto: number;
	codtiporeporte: string;
	nombretiporeporte: string;
	estado: string;
    nombreestado: string;
    fechacreacion: Date;
    fechacreacionformat: string;
    usuariocreacion: string;
    fechamodificacion: Date;
    fechamodificacionformat: string;
    usuariomodificacion: string;
    fechainivigencia: Date;
    fechafinvigencia: Date;
    vigencia: number;
    diafrecuencia: number;
    idtipoproducto: number;
    nombretipoproducto: string;
    camposSeleccionados: Array<PaConfigcamposreporte>;
}