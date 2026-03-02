/**
 * Clase que representa a una persona con ciertas características básicas
 */
export abstract class Persona {
  /**
   * Crea una nueva instancia de una persona
   * @param _dni - DNI de la persona
   * @param _nombre - Nombre completo de la persona
   * @param _nacimiento - Fecha de nacimiento
   * @param _telefono - Número de teléfono
   * @param _correo - Dirección de correo electrónico
   */
  constructor(private _dni: string, private _nombre: string, 
    private _nacimiento: string, private _telefono: number, 
    private _correo: string) {}

  /**
   * Getters y setters
   */
  get dni(): string { return this._dni; }
  set dni(nuevo: string) { if (this.comprobarDNI(nuevo)) this._dni = nuevo; }

  get nombre(): string { return this._nombre; }
  set nombre(nuevo: string) { this._nombre = nuevo; }

  get nacimiento(): string { return this._nacimiento; }
  set nacimiento(nuevo: string) { if (this.comprobarFecha(nuevo)) this._nacimiento = nuevo; }

  get telefono(): number { return this._telefono; }
  set telefono(nuevo: number) { this._telefono = nuevo; }

  get correo(): string { return this._correo; }
  set correo(nuevo: string) { if (this.comprobarCorreo(nuevo)) this._correo = nuevo; }

  /**
   * Comprueba si el nuevo DNI tiene un formato válido
   */
  comprobarDNI(dni: string): boolean {
    const regex = new RegExp('[0-9]{8}[a-zA-Z]');
    if (!regex.test(dni)) return false;
    return true;
  }

  /**
   * Comprueba si la nueva fecha tiene un formato válido
   */
  comprobarFecha(fecha: string): boolean {
    const regex = new RegExp('[0-9]{2}-?[0-9]{2}-?[0-9]{4}');
    if (!regex.test(fecha)) return false;
    return true;
  }

  /**
   * Comprueba si el nuevo correo tiene un formato válido
   */
  comprobarCorreo(correo: string): boolean {
    const regex = new RegExp('[a-zA-Z0-9]+@[a-zA-Z0-9]+');
    if (!regex.test(correo)) return false;
    return true;
  }

  /**
   * Método a definir en las clases hijas
   */
  abstract getResumen(): string;
}