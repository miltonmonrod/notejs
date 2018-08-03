export class PaConfigcamposreporte {
        idconfigcamposreporte : number;
        nombrecampo : string;
        nombretipoformato: string;
        codtipoformato : number; //- Listado de PA_VALORREFERENCIA con los tipos de formatos permitidos
        codtipocampo: string; //- Alamcena si el campo es abierto o una lista de referencia
        nombrelistavalores: string;
        codlistavalores : number;//- Si la respuesta al campo anterior es una lista  despliega las lista de valores permitidas PA_TIPOREFERENCIA para el campo, ejemplo: Departamento, Municipios
        longitud : number;
        indobligatoriedad : string;
        destinovalidacion : string;//- Indica si el campo posee validaciones contra otros sistemas
        nombretipovalidacion: string;
        codtipovalidacion : number;//- Listado de PA_VALORREFERENCIA contra que sistemas validaria 
        nombreestado: string;
        estado : string;
        fechacreacion : Date;
        fechacreacionformat: string;
        usuariocreacion : string;
        fechamodificacion : Date;
        fechamodificacionformat: string;
        usuariomodificacion : string;
        fechainivigencia : Date;
        fechafinvigencia : Date;
}