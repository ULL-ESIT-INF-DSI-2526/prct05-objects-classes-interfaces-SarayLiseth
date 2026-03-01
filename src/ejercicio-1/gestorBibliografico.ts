import { ElementoBibliografico } from "./elementoBibliografico"

/**
 * Representa un gestor bibliográfico que permite almacenar, mostrar y buscar
 * elementos bibliográficos por palabras clave y por IEEE 
 */
export class GestorBibliografico {
  private elementos: ElementoBibliografico[] = [];

  /**
   * Permite añadir un elemento bibliográfico al sistema
   * @param elemento - Nuevo elemento a añadir
   */
  agregarElemento(elemento: ElementoBibliografico): void {
    this.elementos.push(elemento);
  }

  /**
   * Muestra toda la información de cada elemento bibliográfico del sistema
   * @param elementos - Elementos bibliográficos del sistema
   */
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

  /**
   * Permite buscar un elemento bilbiográfico por una palabra clave
   * @param palabra - Palabra clave por la que buscar el elemento
   */
  buscar(palabra: string): ElementoBibliografico[] {
    return this.elementos.filter(elem =>
      elem.palabrasClase.some(p => p.toLowerCase().includes(palabra.toLowerCase()))
    );
  }

  /**
   * Filtra los elementos bibliográficos de la colección basándose en múltiples criterios opcionales
   * @param criterios - Objeto que agrupa los filtros de búsqueda. Todos sus campos son opcionales
   * - titulo: Fragmento de texto que debe estar contenido en el título del elemento
   * - autor: Fragmento de texto que debe coincidir parcialmente con al menos uno de los autores
   * - fechaPublicacion: Fragmento de texto que debe estar incluido en la fecha de publicación
   * - editorial: Fragmento de texto que debe estar presente en el nombre de la editorial
   * @returns Un arreglo de objetos `ElementoBibliografico` que coinciden con los criterios especificados
   */
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

  /**
   * Exporta el identificado en formato IEEE de los elementos bibliográficos
   * @param elementos - Elementos bibliográficos del sistema
   */
  exportarIEEE(elementos: ElementoBibliografico[] = this.elementos): void {
    elementos.forEach(elem => console.log(elem.obtenerReferenciaIEEE()));
  }
}