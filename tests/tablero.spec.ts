import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Tablero, Ficha } from '../src/ejercicio-2/tablero.ts';

describe('Clase Tablero', () => {
  let tablero: Tablero;

  beforeEach(() => {
    tablero = new Tablero();
  });

  it('Debe imprimir el tablero por consola sin errores', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    tablero.imprimir();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('Debe lanzar un error si la columna es menor que 0', () => {
    expect(() => tablero.colocarFicha(-1, Ficha.Jugador1))
      .toThrowError("Columna no válida. Debe ser un número entre 0 y 6");
  });

  it('Debe lanzar un error si la columna es mayor que 6', () => {
    expect(() => tablero.colocarFicha(7, Ficha.Jugador1))
      .toThrowError("Columna no válida. Debe ser un número entre 0 y 6");
  });

  it('Debe colocar una ficha correctamente en una columna vacía', () => {
    expect(() => tablero.colocarFicha(0, Ficha.Jugador1)).not.toThrow();
  });

  it('Debe lanzar un error si se intenta colocar una ficha en una columna llena', () => {
    for (let i = 0; i < 6; i++) {
      tablero.colocarFicha(0, Ficha.Jugador1);
    }
    expect(() => tablero.colocarFicha(0, Ficha.Jugador2))
      .toThrowError("La columna está completa");
  });

  it('Debe detectar un empate cuando la fila superior está llena', () => {
    expect(tablero.estaLleno()).toBe(false);
    (tablero as Tablero)['rejilla'][0].fill(Ficha.Jugador1);
    expect(tablero.estaLleno()).toBe(true);
  });

  it('Debe devolver false si no hay victoria', () => {
    tablero.colocarFicha(0, Ficha.Jugador1);
    expect(tablero.comprobarVictoria(Ficha.Jugador1)).toBe(false);
  });

  it('Debe detectar victoria HORIZONTAL', () => {
    tablero.colocarFicha(0, Ficha.Jugador1);
    tablero.colocarFicha(1, Ficha.Jugador1);
    tablero.colocarFicha(2, Ficha.Jugador1);
    tablero.colocarFicha(3, Ficha.Jugador1);
    expect(tablero.comprobarVictoria(Ficha.Jugador1)).toBe(true);
  });

  it('Debe detectar victoria VERTICAL', () => {
    tablero.colocarFicha(0, Ficha.Jugador2);
    tablero.colocarFicha(0, Ficha.Jugador2);
    tablero.colocarFicha(0, Ficha.Jugador2);
    tablero.colocarFicha(0, Ficha.Jugador2);
    expect(tablero.comprobarVictoria(Ficha.Jugador2)).toBe(true);
  });

  it('Debe detectar victoria DIAGONAL ASCENDENTE (/)', () => {
    tablero.colocarFicha(0, Ficha.Jugador1); 
    tablero.colocarFicha(1, Ficha.Jugador2); tablero.colocarFicha(1, Ficha.Jugador1);
    tablero.colocarFicha(2, Ficha.Jugador2); tablero.colocarFicha(2, Ficha.Jugador2); 
    tablero.colocarFicha(2, Ficha.Jugador1);
    tablero.colocarFicha(3, Ficha.Jugador2); tablero.colocarFicha(3, Ficha.Jugador2); 
    tablero.colocarFicha(3, Ficha.Jugador2); tablero.colocarFicha(3, Ficha.Jugador1);
    expect(tablero.comprobarVictoria(Ficha.Jugador1)).toBe(true);
  });

  it('Debe detectar victoria DIAGONAL DESCENDENTE (\\)', () => {
    tablero.colocarFicha(3, Ficha.Jugador1); 
    tablero.colocarFicha(2, Ficha.Jugador2); tablero.colocarFicha(2, Ficha.Jugador1);
    tablero.colocarFicha(1, Ficha.Jugador2); tablero.colocarFicha(1, Ficha.Jugador2); 
    tablero.colocarFicha(1, Ficha.Jugador1);
    tablero.colocarFicha(0, Ficha.Jugador2); tablero.colocarFicha(0, Ficha.Jugador2); 
    tablero.colocarFicha(0, Ficha.Jugador2); tablero.colocarFicha(0, Ficha.Jugador1);
    expect(tablero.comprobarVictoria(Ficha.Jugador1)).toBe(true);
  });
});