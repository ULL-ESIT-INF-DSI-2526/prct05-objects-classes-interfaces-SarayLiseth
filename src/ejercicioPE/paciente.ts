import { Persona } from "./persona"

export type GrupoSanguineo = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "0-";

export class Paciente extends Persona {
  /**
   * Crea una nueva instancia de un Medico
   * @param _dni - DNI de la persona
   * @param _nombre - Nombre completo de la persona
   * @param _nacimiento - Fecha de nacimiento
   * @param _telefono - Número de teléfono
   * @param _correo - Dirección de correo electrónico
   * @param _numHistorial - Número del historial del paciente
   * @param _grupoSangre - Grupo sanguíneo del paciente
   * @param _alergias - Alergias que presenta el paciente
   */
    constructor(_dni: string, _nombre: string, _nacimiento: string,
        _telefono: number, _correo: string, private _numHistorial: number,
        private _grupoSangre: GrupoSanguineo, private _alergias: string[]) {
      super(_dni, _nombre, _nacimiento, _telefono, _correo)
    }

    /**
    * Getters y setters
    */
    get numHistorial(): number { return this._numHistorial; }
    set numHistorial(nuevo: number ) { this._numHistorial = nuevo; }

    get grupoSangre(): string { return this._grupoSangre; }
    set grupoSangre(nuevo: GrupoSanguineo) { this._grupoSangre = nuevo; }

    get alergias(): string[] { return this._alergias; }
    set alergias(nueva: string) { this._alergias.push(nueva); }

     /**
     * Muestra la información básica del paciente
     * @returns String con la información básica
     */
    getResumen(): string {
      const resultado = `Soy ${this.nombre}, con DNI ${this.dni}, correo ${this.correo} y número de teléfono ${this.telefono}. Mi número de historial es ${this.numHistorial}, mi grupo sanguíneo es ${this.grupoSangre} y mis alergias son ${this.alergias}`;
      return resultado;
    }
}