import { describe, it, expect, beforeEach } from 'vitest';
import { Medico, Turno } from '../src/ejercicioPE/medico';
import { Paciente } from '../src/ejercicioPE/paciente';


describe('Medico tests', () => {
  let medico: Medico;
  let mañana: Turno = "Mañana";
  let paciente: Paciente;
  let hospital: Hospital;

  beforeEach(() => {
    medico = new Medico("12345678J", "Saray Glez", "19-02-2004", 654789123, "algo@.com", 75638, "Neurocirugia", mañana);
    paciente = new Paciente("12345678J", "Saray Glez", "19-02-2004", 654789123, "algo@.com", 75638, "A+", ["Gato", "Polen"]);
  });

  it('Debe mostrar correctamente la lista de médico o pacientes', () => {
    expect(paciente.getResumen())
    .toBe("Soy Saray Glez, con DNI 12345678J, correo algo@.com y número de teléfono 654789123. Mi número de historial es 75638, mi grupo sanguíneo es A+ y mis alergias son Gato,Polen");
  });

});