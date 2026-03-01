/**
 * Representa los posibles estados de una celda del tablero
 */
export enum Ficha {
  Vacia = '-',
  Jugador1 = 'X',
  Jugador2 = 'O'
}

/**
 * Define la estructura de un jugador en la partida
 */
export interface Jugador {
  nombre: string;
  ficha: Ficha;
}

/**
 * Define las operaciones básicas que soporta el tablero de juego
 */
export interface TableroI {
  imprimir(): void;
  colocarFicha(columna: number, ficha: Ficha): void;
  comprobarVictoria(ficha: Ficha): boolean;
  estaLleno(): boolean;
}

/**
 * Representa un tablero del juego Conecta4. Maneja una cuadrícula de 6 filas
 * y 7 columnas donde las fichas "caen"
 */
export class Tablero implements TableroI {
  private readonly Filas = 6;
  private readonly Columnas = 7;
  private rejilla: Ficha[][];

  /**
   * Crea una nueva instancia del tablero inicializando sus celdas vacías
   */
  constructor() {
    this.rejilla = Array.from({ length: this.Filas }, () =>
      Array(this.Columnas).fill(Ficha.Vacia)
    );
  }

  /**
   * Imprime el tablero actual en la consola
   */
  imprimir(): void {
    this.rejilla.forEach(fila => {
      console.log(fila.join(' '));
    });
  }

  /**
   * Coloca una ficha en la columna especificada, dejándola "caer" hasta la fila
   * más baja que esté vacía en esa columna
   */
  colocarFicha(columna: number, ficha: Ficha): void {
    if (columna < 0 || columna >= this.Columnas) throw new Error("Columna no válida. Debe ser un número entre 0 y 6");
    for (let i = this.Filas - 1; i >= 0; i--) {
      if (this.rejilla[i][columna] === Ficha.Vacia) {
        this.rejilla[i][columna] = ficha;
        return;
      }
    }
    throw new Error("La columna está completa");
  }

  /**
   * Verifica si el jugador actual ha conseguido alinear 4 fichas consecutivas. Se comprueba
   * en horizontal, vertical, diagonal ascendente y descendente
   * @param ficha - Ficha del jugador que se evalua
   * @returns `true`si el jugador ha ganado, `false` en caso contrario
   */
  comprobarVictoria(ficha: Ficha): boolean {
    return this.rejilla.some((fila, f) =>
      fila.some((celda, c) => {
        if (celda !== ficha) return false;
        const horizontal = c <= this.Columnas - 4 &&
          [1, 2, 3].every(salto => this.rejilla[f][c + salto] === ficha);
        const vertical = f <= this.Filas - 4 && 
          [1, 2, 3].every(salto => this.rejilla[f + salto][c] === ficha);
        const diagonalDescendente = f <= this.Filas - 4 && c <= this.Columnas - 4 && 
          [1, 2, 3].every(salto => this.rejilla[f + salto][c + salto] === ficha);
        const diagonalAscendente = f >= 3 && c <= this.Columnas - 4 && 
          [1, 2, 3].every(salto => this.rejilla[f - salto][c + salto] === ficha);
        return horizontal || vertical || diagonalDescendente || diagonalAscendente;
      })
    );
  }

  /**
   * Determina si el tablero se ha llenado por completo, lo cual indica 
   * la condición de empate
   */
  estaLleno(): boolean {
    return this.rejilla[0].every(celda => celda !== Ficha.Vacia);
  }
}