import { Persona } from "./persona"

export type Turno = "Mañana" | "Tarde" | "Noche";

export class Medico extends Persona {
  /**
   * Crea una nueva instancia de un Medico
   * @param _dni - DNI de la persona
   * @param _nombre - Nombre completo de la persona
   * @param _nacimiento - Fecha de nacimiento
   * @param _telefono - Número de teléfono
   * @param _correo - Dirección de correo electrónico
   * @param _numColegiado - Número de colegiado del médico
   * @param _especialidad - Especialidad del médico
   * @param _turno - Turno en el que trabaja
   */
    constructor(_dni: string, _nombre: string, _nacimiento: string,
        _telefono: number, _correo: string, private _numColegiado: number,
        private _especialidad: string, private _turno: Turno) {
      super(_dni, _nombre, _nacimiento, _telefono, _correo)
    }

   /**
    * Getters y setters
    */
    get numColegiado(): number { return this._numColegiado; }
    set numColegiado(nuevo: number ) { this._numColegiado = nuevo; }

    get especialidad(): string { return this._especialidad; }
    set especialidad(nueva: string) { this._especialidad = nueva; }

    get turno(): string { return this._turno; }
    set turno(nuevo: Turno) { this._turno = nuevo; }

    /**
     * Muestra la información básica del médico
     * @returns String con la información básica
     */
    getResumen(): string {
      const resultado = `Soy ${this.nombre}, con DNI ${this.dni}, correo ${this.correo} y número de teléfono ${this.telefono}. Mi especialidad es ${this.especialidad}, mi número de colegiado es ${this.numColegiado} y trabajo en el turno de ${this.turno}`;
      return resultado;
    }
}