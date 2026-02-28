import { ElementoBibliografico } from "./elementoBibliografico"

export class GestorBibliografico {
  private elementos: ElementoBibliografico[] = [];

  agregarElemento(elemento: ElementoBibliografico): void {
    this.elementos.push(elemento);
  }

  mostrarTabla(elementos: ElementoBibliografico[] = this.elementos): void {
    const datos = elementos.map(elem => ({
      Tipo: elem.tipo,
      Título: elem.titulo,
      Autores: elem.autores.join(', '),
      Fecha: elem.fechaPublicacion,
      Editorial: elem.editorial,
      PalabrasClave: elem.palabrasClase.join(', ')
    }));
    console.table(datos);
  }

  buscar(palabra: string): ElementoBibliografico[] {
    return this.elementos.filter(elem =>
      elem.palabrasClase.some(p => p.toLowerCase().includes(palabra.toLowerCase()))
    );
  }

  filtrar(criterios: { titulo?: string; autor?: string; fechaPublicacion?: string;
    editorial?: string }): ElementoBibliografico[] {
    return this.elementos.filter(elem => {
      if (criterios.titulo && !elem.titulo.toLowerCase().includes(criterios.titulo.toLowerCase())) return false;
      if (criterios.autor && !elem.autores.some(a => a.toLowerCase().includes(criterios.autor!.toLowerCase()))) return false;
      if (criterios.fechaPublicacion && !elem.fechaPublicacion.toLowerCase().includes(criterios.fechaPublicacion.toLowerCase())) return false;
      if (criterios.editorial && !elem.editorial.toLowerCase().includes(criterios.editorial.toLowerCase())) return false;
      return true;
    });
  }

  exportarIEEE(elementos: ElementoBibliografico[] = this.elementos): void {
    elementos.forEach(elem => console.log(elem.obtenerReferenciaIEEE()));
  }
}