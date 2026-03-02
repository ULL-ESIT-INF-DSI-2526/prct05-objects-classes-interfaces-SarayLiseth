import { describe, it, expect, beforeEach } from 'vitest';
import { Medico, Turno } from '../src/ejercicioPE/medico'

describe('Medico tests', () => {
  let medico1: Medico;
  let mañana: Turno = "Mañana";

  beforeEach(() => {
    medico1 = new Medico("12345678J", "Saray Glez", "19-02-2004", 654789123, "algo@.com",
       75638, "Neurocirugia", mañana);
  });

  it('Debe cambiar un valor si es correcto', () => {
    medico1.dni = "98765432F";
    expect(medico1.dni).toBe("98765432F");

    medico1.nombre = "Maria Perez";
    expect(medico1.nombre).toBe("Maria Perez");

    medico1.telefono = 654117892;
    expect(medico1.telefono).toBe(654117892);

    medico1.nacimiento = "25-09-2005";
    expect(medico1.nacimiento).toBe("25-09-2005");

    medico1.correo = "algoValido@ull";
    expect(medico1.correo).toBe("algoValido@ull");

    medico1.numColegiado = 98765;
    expect(medico1.numColegiado).toBe(98765);

    medico1.especialidad = "Cardiologia";
    expect(medico1.especialidad).toBe("Cardiologia");

    medico1.turno = "Noche";
    expect(medico1.turno).toBe("Noche");
  });

  it('No debe cambiar un valor si es incorrecto', () => {
    medico1.dni = "987654324"
    expect(medico1.dni).toBe("12345678J");

    medico1.nacimiento = "25-09-05"
    expect(medico1.nacimiento).toBe("19-02-2004");

    medico1.correo = "algoINValidoull";
    expect(medico1.correo).toBe("algo@.com");
  });

  it('Debe mostrar correctamente la información del médico', () => {
    expect(medico1.getResumen())
    .toBe("Soy Saray Glez, con DNI 12345678J, correo algo@.com y número de teléfono 654789123. Mi especialidad es Neurocirugia, mi número de colegiado es 75638 y trabajo en el turno de Mañana");
  })
});