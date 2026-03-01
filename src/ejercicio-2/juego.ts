import { TableroI, Jugador, Tablero, Ficha } from "./tablero"

/**
 * Representa una partida de Conecta4, permitiendo jugar turnos según
 * el jugador en un tablero predefinido
 */
export class Juego {
  private tablero: TableroI;
  private jugador1: Jugador;
  private jugador2: Jugador;
  private turnoActual: Jugador;
  private juegoTerminado: boolean;

  /**
   * Crea una nueva instancia de una partida de Conecta4
   * @param nombreJ1 - Jugador 1
   * @param nombreJ2 - Jugador 2
   */
  constructor(nombreJ1: string = "Jugador 1", nombreJ2: string = "Jugador 2") {
    this.tablero = new Tablero();
    this.jugador1 = { nombre: nombreJ1, ficha: Ficha.Jugador1 };
    this.jugador2 = { nombre: nombreJ2, ficha: Ficha.Jugador2 };
    this.turnoActual = this.jugador1;
    this.juegoTerminado = false;
  }

  /**
   * Simula el desarrollo de un turno del juego Conecta4, permitiendo al jugador
   * colocar su ficha y verificar si ha ganado o si ha empatado
   * @param columna - Columna en la que se quiere poner la ficha
   */
  jugarTurno(columna: number): void {
    if (this.juegoTerminado) {
      console.log("El juego ha terminado");
      return;
    }
    console.log(`Es el turno de ${this.turnoActual.nombre} (${this.turnoActual.ficha})`);
    try {
      this.tablero.colocarFicha(columna, this.turnoActual.ficha);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(`${error.message} Por favor, selecciona otra columna`);
      return; 
    }
    this.tablero.imprimir();
    if (this.tablero.comprobarVictoria(this.turnoActual.ficha)) {
      console.log(`¡Felicidades! ${this.turnoActual.nombre} ha ganado la partida`);
      this.juegoTerminado = true;
      return;
    }
    if (this.tablero.estaLleno()) {
      console.log("¡Empate! El tablero está lleno");
      this.juegoTerminado = true;
      return;
    }
    this.turnoActual = this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1;
  }
}