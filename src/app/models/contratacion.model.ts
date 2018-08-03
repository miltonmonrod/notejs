export class Contratista {
    constructor(
        public CCO_ID: number,
        public CCO_IDENTIFICACION: string,
        public TNJ_ID_NATURALEZA_JURIDICA: number,
        public CCO_NOMBRE: string,
        public CCO_DIRECCION: string,
        public CCO_COREO_ELECTRONICO: string,
        public CCO_TELEFONO_CELULAR: string,
        public CCO_PROFESION: string,
        public CCO_NOMBRE_REPRESENTANTE_LEGAL: string,
        public DOC_ID_REPRESENTANTE: number,
        public CCO_NUM_IDENTIFICACION_REPRESENTANTE: string,
        public DOC_ID: number,
        public CCO_TELEFONO_FIJO: string,
        public ZON_ID_DEP: string,
        public ZON_ID: string,
        public ZON_ID_REPRESENTANTE_DEP: string,
        public ZON_ID_REPRESENTANTE: string,
        public CCO_COD_ACTI_ECONOMICA_RUT: string,
        public CCO_COD_ACTI_ECONOMICA_RIT: string,
        public CCO_DIGITO_VERIFICACION: number,
        public CCO_TEMPORAL: any
    ) { }
}

export class Contrato {
    public CTT_ID: number;//-
    public CTT_NUMERO_CONTRATO: string;//-
    public CTT_FECHA_SUSCRIPCION: Date;//-
    public CTT_FECHA_INICIO: any;//-
    public CTT_FECHA_TERMINACION: Date;//-
    public CTT_TIEMPO_PRORROGA: string;
    public CTT_NOMBRE_INTERVENTOR: string;
    public CTT_NUMERO_IDENTIFICACION: string;
    public CTT_TIPO_INTERVENTORIA: string;
    public CTT_VALOR_CONTRATO: number;//-
    public CTT_ESTADO: string;
    public TMS_ID: number;
    public ASU_ID_INTERNO: number;//-supervisor interno
    public ASU_ID_EXTERNO: number;//-supervisor externo
    public CTT_FECHA_LIQUIDACION: Date;//-
    public CTT_OBJETO: string;//-
    public CTT_NUMERO_REGISTRO: number;//-
    public CTT_ID_PADRE: number;
    public CLI_OBSERVACIONES: string;//-
    public CLI_ARCHIVO: string;
    public CLI_VALOR_FINAL_CONTRATO: number;//-
    public CTL_ID: number;//-tipo liquidación
    public CTT_ANO: string; //-
    public CCO_ID: number;
    public CTC_ID: number;
    public CTT_FECHA_SOLICITUD: Date;//-
    public CTT_FECHA_TERMINACION_FINAL: Date;//-
    public CTT_FECHA_APROBACION_POLIZA: Date;
    public USU_ID: number;
    public DEP_ID: string;
    public CTT_DIAS_SUSPENSIONES: number;//-
    public CPOL_ID: number;
    public ZON_ID: string;
    public CTT_DIAS_PRORROGA: number;//-
    public CTT_DIAS_TOTAL_DURACION_CONTRATO: number;//-
    public AOG_ID: number;
    public TPE_ID: number;
    public USU_ID_ABOGADO: number;
    public CTT_VALOR_CONTRATO_MENSUAL: number;//-
    public CTT_NOMBRE_CONTRATISTA: string;
    public CTT_DIRECCION: string;
    public CTT_IDENTIFICACION_CONTRATISTA: string;
    public TNJ_ID_NATURALEZA_JURIDICA: number;
    public CTT_PLAZO: string;//-
    public CTT_OBLIGACIONES: string;
    public CTT_INCLUYE_IVA: string;//--
    public CPC_ID: number;
    public CASE_ID: number;
    public CTT_ANTICIPO_VALOR: number;
    public CTT_PORCENTAJE_ANTICIPO: number;//-
    public CTT_TOTAL_VALOR: number;
    public CTT_VALOR_TOTAL: number;
    public CTT_POLIZA_NUMERO: string;
    public CTT_POLIZA_RCE: string;
    public CTT_ANEXO_NUMERO: string;
    public CTT_FECHA_APROBACION: Date;
    public USU_ID_ELABORA: string;
    public CTT_RP: string;
    public CTT_RP_FECHA: Date;
    public CTT_CDP_REAJUSTE: string;
    public CTT_FORMA_PAGO_CONVENIOS: string;//-
    public CTT_DIAS_DURACION: number;
    public CTT_PORCENTAJE_TRABAJO: number;
    public CTT_UBICACION_POLIZA: string;
    public CPC_ID2: number;
    public CTT_UBICACION_ACTA_APRO_POLIZA: string;
    public CTT_UBICACION_MERGE_POLIZA: string;
    public CTT_FECHA_EXPEDICION_POLIZA: Date;
    public CTT_CARGA_MERGE_AZ: number;
    public CTT_FECHA_REGISTRO_PRESUP: Date;//-
    public CTT_VALOR_APORTE_MINISTERIO: number;//-
    public CTT_VALOR_APORTE_CONTRAPARTIDA: number;//-
    public CTT_VALOR_INICIAL: number;
    public CTT_VALOR_REAJUSTE: number;
    public CTT_VALOR_MENSUAL_CTO_PRE_SERV: number;
    public CTT_SUSPENCIONES: number;
    public CTT_SIEMPRE: number;
    public CTT_CESION: number;
    public CTT_VALOR_ADICIONES: number;//-
    public CTT_NUM_PROCESO_SECOP_II: string; //-
    //Vienen del EP
    public CTT_FORMA_PAGO: string;//-
    public FAE_ID: number; //-
}

export class EpesDisponibles {
    constructor(
        public FAE_ID: number,
        public FAE_OBJETO: string,
        public FAE_VALOR_CDP: number,
        public FAE_NUMERO_CDP: string,
        public PLN_NOMBRE: string,
        public DEP_NOMBRE: string,
        public CLS_NOMBRE: string,
        public CTT_ID: string
    ){}
}