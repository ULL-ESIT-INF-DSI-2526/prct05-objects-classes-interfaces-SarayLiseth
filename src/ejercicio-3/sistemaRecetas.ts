export enum TipoChef {
  Profesional = "Profesional",
  Aficionado = "Aficionado"
}

export class Paso {
  constructor (
    public nombre: string,
    public duracion: number,
    public etiquetas: string[],
    public opcional: boolean,
    public vecesCompletado: number = 0) {}
}

export class Receta {
  constructor (
    public nombre: string,
    public añoPubli: number,
    public pasos: Paso[] = []) {}
  
  agregarPaso(paso: Paso): void {
    this.pasos.push(paso);
  }
  
  numeroPasos(): number {
    return this.pasos.length;
  }
  
  tiempoElaboracion():{ min: number, max: number} {
    let min = 0, max = 0;
    this.pasos.forEach(paso => {
      max += paso.duracion;
      if (!paso.opcional) min += paso.duracion;
    });
    return { min, max };
  }
}

export class Recetario {
  constructor(public recetas: Receta[] = []) {}

  agregarReceta(receta: Receta): void {
    this.recetas.push(receta);
  }
}

export class Chef {
  constructor (
    public nombre: string,
    public tipo: TipoChef,
    public seguidores: number,
    public recetario: Recetario = new Recetario()) {}
}

export class SistemaRecetas {
  private chefs: Chef[] = [];

  agregarChef(chef: Chef): void {
    this.chefs.push(chef);
  }
  
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

  buscarReceta(receta: string): void {
    const resultado = this.chefs.flatMap(c =>
      c.recetario.recetas.filter(r =>
        r.nombre.toLowerCase().includes(receta.toLowerCase()))
        .map(r => ({ Autor: c.nombre, Receta: r.nombre, Año: r.añoPubli}))
    );
    console.table(resultado);
  }

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