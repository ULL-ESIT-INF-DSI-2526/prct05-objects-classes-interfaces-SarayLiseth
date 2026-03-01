/**
 * Representa los tipos de Chef
 */
export enum TipoChef {
  Profesional = "Profesional",
  Aficionado = "Aficionado"
}

/**
 * Representa un paso de una receta
 */
export class Paso {
  constructor (
    public nombre: string,
    public duracion: number,
    public etiquetas: string[],
    public opcional: boolean,
    public vecesCompletado: number = 0) {}
}

/**
 * Representa una receta del recetario y permite añadir pasos, obtener el número
 * de paso y el tiempo de elaboración
 */
export class Receta {
  /**
   * Crea una nueva instancia de una receta
   * @param nombre - Nombre de la receta
   * @param pasos - Lista de pasos requeridos en la receta
   */
  constructor (
    public nombre: string,
    public añoPubli: number,
    public pasos: Paso[] = []) {}
  
  /**
   * Añade un paso a la lista de pasos de la receta
   * @param paso - Nuevo paso a añadir
   */
  agregarPaso(paso: Paso): void {
    this.pasos.push(paso);
  }
  
  /**
   * Calcula el número de pasos totales de una receta
   */
  numeroPasos(): number {
    return this.pasos.length;
  }
  
  /**
   * Calcula el tiempo de elaboración que requiere la receta
   * @returns Tupla con el tiempo mínima y el máximo requerido, dependiendo de
   * si hay paso opcional o no
   */
  tiempoElaboracion():{ min: number, max: number} {
    let min = 0, max = 0;
    this.pasos.forEach(paso => {
      max += paso.duracion;
      if (!paso.opcional) min += paso.duracion;
    });
    return { min, max };
  }
}

/**
 * Representa un recetario
 */
export class Recetario {
  /**
   * Crea una nueva instancia de un recetario
   * @param recetas - Lista de recetas que pertenecrñan al recetario
   */
  constructor(public recetas: Receta[] = []) {}

  /**
   * Añade una receta el recetario
   * @param receta - Receta a añadir al recetario
   */
  agregarReceta(receta: Receta): void {
    this.recetas.push(receta);
  }
}

/**
 * Representa a un Chef
 */
export class Chef {
  /**
   * Crea una nueva instancia de un Chef
   * @param nombre - Nombre del chef
   * @param tipo - Tipo del chef, profesional o aficionado
   * @param seguidores - Número de seguidores del chef
   * @param recetario - Recetario del chef
   */
  constructor (
    public nombre: string,
    public tipo: TipoChef,
    public seguidores: number,
    public recetario: Recetario = new Recetario()) {}
}

/**
 * Representa un sistema de recetas
 */
export class SistemaRecetas {
  private chefs: Chef[] = [];

  /**
   * Añade un chef a la lista de chefs del sistema
   * @param chef - Chef a añadir
   */
  agregarChef(chef: Chef): void {
    this.chefs.push(chef);
  }
  
  /**
   * Imprime por consola toda la información del sistema en formato de tabla
   */
  verInfo(): void {
    console.log("\n=== Chef s===");
    console.table(this.chefs.map(c => ({
      Nombre: c.nombre,
      Tipo: c.tipo,
      Seguidores: c.seguidores,
    })));
    console.log("\n=== Recetas ===");
    console.table(this.chefs.flatMap(c =>
      c.recetario.recetas.map(r => {
        const tiempo = r.tiempoElaboracion();
        const texto = tiempo.min === tiempo.max ? `${tiempo.max}s` : `${tiempo.min}s - ${tiempo.max}s`;
        return {
          Autor: c.nombre,
          Receta: r.nombre,
          Año: r.añoPubli,
          Pasos: r.numeroPasos(),
          Tiempo: texto
        };
      })
    ));
    console.log("\n=== Pasos ===");
    console.table(this.chefs.flatMap(c =>
      c.recetario.recetas.map(r =>
        r.pasos.map(p => ({
          Receta: r.nombre,
          Paso: p.nombre,
          Duracion: `${p.duracion}s`,
          Opcional: p.opcional ? "Si" : "No"
        }))
      )
    ));
  }

  /**
   * Busca un chef del sistema por su nombre
   * @param nombre - Nombre del chef a buscar
   */
  buscarChef(nombre: string): void {
    const resultado = this.chefs.filter(c =>
      c.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    console.table(resultado.map(c => ({
      Nombre: c.nombre,
      Tipo: c.tipo,
      Seguidores: c.seguidores
    })));
  }

  /**
   * Busca una receta del sistema por su nombre o parte de él
   * @param receta - Nombre de la receta a buscar
   */
  buscarReceta(receta: string): void {
    const resultado = this.chefs.flatMap(c =>
      c.recetario.recetas.filter(r =>
        r.nombre.toLowerCase().includes(receta.toLowerCase()))
        .map(r => ({ Autor: c.nombre, Receta: r.nombre, Año: r.añoPubli}))
    );
    console.table(resultado);
  }

  /**
   * Busca un paso del sistema por su nombre o parte de él
   * @param paso - Nombre del paso a buscar
   */
  buscarPaso(paso: string): void {
    const resultado = this.chefs.flatMap(c =>
      c.recetario.recetas.flatMap(r =>
        r.pasos.filter(p =>
          p.nombre.toLowerCase().includes(paso.toLowerCase()))
          .map(p => ({
            Autor: c.nombre,
            Receta: r.nombre,
            Paso: p.nombre,
            Duración: `${p.duracion}s`,
            Opcional: p.opcional ? "Si" : "No"
          }))
      )
    );
    console.table(resultado);
  }
}