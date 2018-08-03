export class PosVenta {
    public iD_CONTACTO: string;
    public registro: string;
    public fechaini: Date;
    public horaini: string;
    public fechafin: Date;
    public horafin: string;
    public telefono: any;
    public idd: number
    public annO_MEDICION: number
    public medicioN_ANTERIOR: string;
    public meS_MEDICION: string;
    public descriptivo: string;
    public vehiculO_ANTERIOR: string;
    public placa: string;
    public concesionario: string;
    public linea: string;
    public modelo: string;
    public fecha: string;
    public filtrO1: string;
    public a1: string;
    public a2: string;
    public nombre: string;
    public p4: string;
    public b1: string;
    public rB1: string;
    public pB1: string;
    public b1a: string;
    public b1b: string;
    public j1a: string;
    public rJ1A: string;
    public c1a: string;
    public rC1A: string;
    public i1: string;
    public i1a: string;
    public i1b: string;
    public p1: string;
    public p2: string;
    public p3: string;
    public rconcesionario: string;
    public medicion: string;
    public vehiculo: string;
    public segmento: string;
    public finalizar: string;
    public ventaID: number;
}
export class RequestFilters {
    constructor(public segmento: string,
        public marca: string,
        public concesionario: string,
        public anio: string,
        public mes: string,
        public motivo: string){

    }
    
}