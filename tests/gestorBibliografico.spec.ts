import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GestorBibliografico } from '../src/ejercicio-1/gestorBibliografico.ts';
import { ElementoBibliografico } from '../src/ejercicio-1/elementoBibliografico.ts';

describe('GestorBibliografico', () => {
  let gestor: GestorBibliografico;
  let elemento: ElementoBibliografico;

  beforeEach(() => {
    gestor = new GestorBibliografico();
    elemento = new ElementoBibliografico('TFG', 'Test', ['Autor'], ['clave1', 'clave2'], 'Resumen', '2020', '1', 'Edit');
    gestor.agregarElemento(elemento);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe mostrar la tabla por consola usando los elementos por defecto', () => {
    const tableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
    gestor.mostrarTabla();
    expect(tableSpy).toHaveBeenCalledOnce();
  });

  it('Debe mostrar la tabla por consola pasando elementos explícitos', () => {
    const tableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
    gestor.mostrarTabla([]);
    expect(tableSpy).toHaveBeenCalledWith([]);
  });

  it('Debe buscar por palabras clave con o sin coincidencia', () => {
    expect(gestor.buscar('CLAVE1').length).toBe(1);
    expect(gestor.buscar('inexistente').length).toBe(0);
  });

  it('Debe filtrar por título', () => {
    expect(gestor.filtrar({ titulo: 'test' }).length).toBe(1);
    expect(gestor.filtrar({ titulo: 'fallo' }).length).toBe(0);
  });

  it('Debe filtrar por autor', () => {
    expect(gestor.filtrar({ autor: 'autor' }).length).toBe(1);
    expect(gestor.filtrar({ autor: 'desconocido' }).length).toBe(0);
  });

  it('Debe filtrar por fecha de publicación', () => {
    expect(gestor.filtrar({ fechaPublicacion: '2020' }).length).toBe(1);
    expect(gestor.filtrar({ fechaPublicacion: '1999' }).length).toBe(0);
  });

  it('Debe filtrar por editorial', () => {
    expect(gestor.filtrar({ editorial: 'edit' }).length).toBe(1);
    expect(gestor.filtrar({ editorial: 'otreditorial' }).length).toBe(0);
  });
  
  it('Debe devolver todo si no se pasan criterios', () => {
    expect(gestor.filtrar({}).length).toBe(1);
  });

  it('Debe exportar IEEE e imprimir por consola', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    gestor.exportarIEEE([elemento]);
    expect(logSpy).toHaveBeenCalledWith('Autor, "Test", Edit, 2020.');
    gestor.exportarIEEE();
    expect(logSpy).toHaveBeenCalledTimes(2); 
  });
});