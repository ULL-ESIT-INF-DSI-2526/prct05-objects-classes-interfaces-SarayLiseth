import { describe, it, expect, beforeEach, vi, afterEach, MockInstance } from 'vitest';
import { Juego } from '../src/ejercicio-2/juego';

describe('Clase JuegoConecta4', () => {
  let juego: Juego;
  let consoleSpy: MockInstance;

  beforeEach(() => {
    juego = new Juego('Alice', 'Bob');
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe cambiar de turno si la jugada es válida', () => {
    juego.jugarTurno(0);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Es el turno de Alice'));
    
    juego.jugarTurno(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Es el turno de Bob'));
  });

  it('No debe cambiar de turno si ocurre un error (columna llena o inválida)', () => {
    juego.jugarTurno(0);
    juego.jugarTurno(-1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Columna no válida'));

    juego.jugarTurno(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Es el turno de Bob'));
  });

  it('Debe terminar el juego y felicitar cuando un jugador gana', () => {
    juego.jugarTurno(0);
    juego.jugarTurno(1);
    juego.jugarTurno(0);
    juego.jugarTurno(1);
    juego.jugarTurno(0);
    juego.jugarTurno(1);
    juego.jugarTurno(0);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('¡Felicidades! Alice ha ganado'));

    juego.jugarTurno(2);
    expect(consoleSpy).toHaveBeenCalledWith("El juego ha terminado");
  });

  it('Debe declarar empate si el tablero se llena sin ganador', () => {
    const tableroInterno = juego['tablero'];
    vi.spyOn(tableroInterno, 'estaLleno').mockReturnValue(true);
    juego.jugarTurno(0); 
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('¡Empate! El tablero está lleno'));
  });

  it('debería manejar correctamente las excepciones que no son de tipo Error', () => {
    const tableroInterno = juego['tablero'];
    vi.spyOn(tableroInterno, 'colocarFicha').mockImplementation(() => {
      throw "Un error que no es un objeto Error"; 
    });
    juego.jugarTurno(0);
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Por favor, selecciona otra columna'));
    juego.jugarTurno(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Es el turno de Alice'));
  });
});