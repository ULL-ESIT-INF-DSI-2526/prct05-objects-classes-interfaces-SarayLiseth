import { describe, it, expect, beforeEach } from 'vitest';
import { Paciente } from '../src/ejercicioPE/paciente'

describe('Paciente tests', () => {
  let paciente: Paciente;

  beforeEach(() => {
    paciente = new Paciente("12345678J", "Saray Glez", "19-02-2004", 654789123, "algo@.com", 75638, "A+", ["Gato", "Polen"]);
  });

  it('Debe cambiar un valor si es correcto', () => {
    paciente.numHistorial = 32145;
    expect(paciente.numHistorial).toBe(32145);

    paciente.grupoSangre = "0-";
    expect(paciente.grupoSangre).toBe("0-");
  });

  it('Debe mostrar correctamente la información del médico', () => {
    expect(paciente.getResumen())
    .toBe("Soy Saray Glez, con DNI 12345678J, correo algo@.com y número de teléfono 654789123. Mi número de historial es 75638, mi grupo sanguíneo es A+ y mis alergias son Gato,Polen");
  });
});