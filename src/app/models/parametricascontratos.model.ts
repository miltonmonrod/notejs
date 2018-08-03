export class NaturalezaJuridica {
    constructor(
    public TNJ_ID_NATURALEZA_JURIDICA:number,
    public TNJ_NOMBRE: string
){}
}

export class TipoLiquidacion {
    constructor(
    public CTL_ID:number,
    public CTL_NOMBRE: string){}
}

export class Supervisores {
    constructor(
    public ASU_ID:number,
    public ASU_NOMBRE: string,
    public ASU_IDENTIFICACION: string,
    public ASU_DEPENDENCIA: string,
    public USU_ID: number
    ){}
}

export class ModalidadSeleccion {
    constructor(
    public TMS_ID:number,
    public TMS_NOMBRE: string){}
}

export class TipoDocumento {
    constructor(
    public ID:number,
    public NOMBRE: string){}
}