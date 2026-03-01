import { describe, it, expect, beforeEach, vi, afterEach, MockInstance } from 'vitest';
import { Paso, Receta, Chef, TipoChef, SistemaRecetas } from '../src/ejercicio-3/sistemaRecetas'

describe('SistemaREcetas tests', () => {
  let pasoObligatorio: Paso;
  let pasoOpcional: Paso;
  let receta: Receta;
  let chef: Chef;
  let sistema: SistemaRecetas;
  let consoleTableSpy: MockInstance;

  beforeEach(() => {
    pasoObligatorio = new Paso("Picar cebolla", 120, ["verdura", "preparación"], false);
    pasoOpcional = new Paso("Añadir picante", 30, ["salsa", "extra"], true);
    receta = new Receta("Tacos al pastor", 2023);
    receta.agregarPaso(pasoObligatorio);
    receta.agregarPaso(pasoOpcional);
    chef = new Chef("Carlos", TipoChef.Profesional, 1500);
    chef.recetario.agregarReceta(receta);
    sistema = new SistemaRecetas();
    sistema.agregarChef(chef);
    consoleTableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Clase Receta', () => {
    it('Debe calcular correctamente el número de pasos', () => {
      expect(receta.numeroPasos()).toBe(2);
    });

    it('Debe calcular el rango de tiempo si hay pasos opcionales', () => {
      const tiempo = receta.tiempoElaboracion();
      expect(tiempo.min).toBe(120);
      expect(tiempo.max).toBe(150);
    });

    it('Debe calcular el mismo max y min si no hay pasos opcionales', () => {
      const recetaSimple = new Receta("Huevo frito", 2024);
      recetaSimple.agregarPaso(new Paso("Freír huevo", 60, ["fritura"], false));
      const tiempo = recetaSimple.tiempoElaboracion();
      expect(tiempo.min).toBe(60);
      expect(tiempo.max).toBe(60);
    });
  });

  describe('Clase SistemaRecetas', () => {
    it('Debe mostrat toda la información en formato tabla', () => {
      sistema.verInfo();
      expect(consoleTableSpy).toHaveBeenCalled();
    });

    it('Debe calcular bien los textos de tiempo', () => {
      const recetaSimple = new Receta("Huevo frito", 2024);
      recetaSimple.agregarPaso(new Paso("Freír", 60, ["fritura"], false)); 
      chef.recetario.agregarReceta(recetaSimple);
      sistema.verInfo();
      expect(consoleTableSpy).toHaveBeenCalled();
    });

    it('Debe mostrar la opcionalidad del paso', () => {
      sistema.buscarPaso("picante"); 
      expect(consoleTableSpy).toHaveBeenCalledWith([{
          Autor: "Carlos",
          Receta: "Tacos al pastor",
          Paso: "Añadir picante", 
          Duración: "30s",
          Opcional: "Si" 
        }
      ]);
    });

    it('Debe encontrar un chef por su nombre', () => {
      sistema.buscarChef("Carlos");
      expect(consoleTableSpy).toHaveBeenCalledWith([
        { Nombre: "Carlos", Tipo: TipoChef.Profesional, Seguidores: 1500 }
      ]);
    });

    it('Debe encontrar una receta por su nombre', () => {
      sistema.buscarReceta("tacos");
      expect(consoleTableSpy).toHaveBeenCalledWith([
        { Autor: "Carlos", Receta: "Tacos al pastor", Año: 2023 }
      ]);    
    });

    it('Debe encontrar un paso por su nombre', () => {
      sistema.buscarPaso("cebolla");
      expect(consoleTableSpy).toHaveBeenCalledWith([ {
        Autor: "Carlos",
        Receta: "Tacos al pastor",
        Paso: "Picar cebolla",
        Duración: "120s",
        Opcional: "No"
      }
      ]);
    });
  })
});