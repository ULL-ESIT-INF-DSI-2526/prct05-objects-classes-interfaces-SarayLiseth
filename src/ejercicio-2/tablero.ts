export enum Ficha {
  Vacia = '-',
  Jugador1 = 'X',
  Jugador2 = 'O'
}

export interface Jugador {
  nombre: string;
  ficha: Ficha;
}

export interface TableroI {
  imprimir(): void;
  colocarFicha(columna: number, ficha: Ficha): void;
  comprobarVictoria(ficha: Ficha): boolean;
  estaLleno(): boolean;
}

export class Tablero implements TableroI {
  private readonly Filas = 6;
  private readonly Columnas = 7;
  private rejilla: Ficha[][];

  constructor() {
    this.rejilla = Array.from({ length: this.Filas }, () =>
      Array(this.Columnas).fill(Ficha.Vacia)
    );
  }

  imprimir(): void {
    this.rejilla.forEach(fila => {
      console.log(fila.join(' '));
    });
  }

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

  estaLleno(): boolean {
    return this.rejilla[0].every(celda => celda !== Ficha.Vacia);
  }
}