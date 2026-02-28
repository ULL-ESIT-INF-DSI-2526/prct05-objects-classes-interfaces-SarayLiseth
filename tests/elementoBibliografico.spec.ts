import { describe, it, expect } from 'vitest';
import { ElementoBibliografico } from '../src/ejercicio-1/elementoBibliografico.ts';

describe('ElementoBibliografico', () => {
  it('Debe lanzar un error si el título está vacío', () => {
    expect(() => {
      new ElementoBibliografico('Revista', '', ['Autor'], [], '', '', '', '');
    }).toThrowError('El elemento debe tener título');
  });

  it('Debe lanzar un error si no hay autores', () => {
    expect(() => {
      new ElementoBibliografico('Revista', 'Título', [], [], '', '', '', '');
    }).toThrowError('Debe indicarse al menos un autor');
  });

  it('Debe formatear Artículo de Revista con datos extra', () => {
    const elem = new ElementoBibliografico('Artículo de revista', 'IA', ['A'], [], '', '2023', '10', 'Ed', { revista: 'Journal', volumen: 2 });
    expect(elem.obtenerReferenciaIEEE()).toBe('A, "IA", Journal, vol. 2, pp. 10, 2023.');
  });

  it('Debe formatear Artículo de Revista sin datos extra', () => {
    const elem = new ElementoBibliografico('artículo de REVISTA', 'IA', ['A'], [], '', '2023', '10', 'Ed');
    expect(elem.obtenerReferenciaIEEE()).toBe('A, "IA", Rev., vol. -, pp. 10, 2023.');
  });

  it('Debe formatear Capítulo de Libro con datos extra', () => {
    const elem = new ElementoBibliografico('Capítulo de libro', 'Cap 1', ['A'], [], '', '2023', '10', 'Ed', { libro: 'Gran Libro' });
    expect(elem.obtenerReferenciaIEEE()).toBe('A, "Cap 1", en Gran Libro, Ed, 2023, pp. 10.');
  });

  it('Debe formatear Capítulo de Libro sin datos extra', () => {
    const elem = new ElementoBibliografico('capítulo de libro', 'Cap 1', ['A'], [], '', '2023', '10', 'Ed');
    expect(elem.obtenerReferenciaIEEE()).toBe('A, "Cap 1", en Libro, Ed, 2023, pp. 10.');
  });

  it('Debe usar el formato por defecto para tipos desconocidos (TFG, TFM, etc.)', () => {
    const elem = new ElementoBibliografico('TFG', 'Mi TFG', ['A', 'B'], [], '', '2023', '10', 'Uni');
    expect(elem.obtenerReferenciaIEEE()).toBe('A and B, "Mi TFG", Uni, 2023.');
  });
});