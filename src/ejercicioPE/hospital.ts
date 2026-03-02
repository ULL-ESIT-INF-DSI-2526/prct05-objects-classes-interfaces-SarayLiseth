import { Medico } from "./medico"
import { Paciente } from "./paciente"

export class Hospital {
  private _medicos: Medico[] = [];
  private _pacientes: Paciente[] = [];

  listar(tipo: string): string[] | undefined  {
    let result = [""];
    if (tipo.toLowerCase() === "medicos") {
      result = this._medicos.map(m => m.nombre);
    } else if (tipo.toLowerCase() === "pacientes") {
      result = this._pacientes.map(p => p.nombre);
    } else return undefined;
    return result;
  }
}