/**
 * Representa un elemento bibliográfico gençerico. Almacena la información básica
 * y permite generar referencias en formato IEEE, adaptándose al tipo de documento.
 */
export class ElementoBibliografico {
  /**
   * Crea una nueva instancia de un elemento bibliográfico
   * @param tipo - El tipo de publicación
   * @param titulo - Título de la publicación. No puede ser vacío
   * @param autores - Lista de nombres de los autores. Debe tener al menos uno
   * @param palabrasClase - Lista de palabras clave asociadas
   * @param resumen - Breve resumen del contenido del elemento
   * @param fechaPublicacion - Fecha en la que se publicó el elemento
   * @param paginas - Número de páginas 
   * @param editorial - La editorial, revista o institución que lo publica
   * @param extras - Diccionarioopcional para datos adicionales
   * @throws Si el `titulo` no se proporciona o es una cadena vacía
   * @throws Si la lista de autores no se proporciona o está vacía
   */
  constructor(
    public tipo: string,
    public titulo: string,
    public autores: string[],
    public palabrasClase: string[],
    public resumen: string,
    public fechaPublicacion: string,
    public paginas: string,
    public editorial: string,
    public extras: Record<string, unknown> = {}
  ) {
    if (!titulo || titulo.trim() === '') throw new Error('El elemento debe tener título');
    if (!autores || autores.length === 0) throw new Error('Debe indicarse al menos un autor');
  }

  /**
   * Genera la referencia bibliográfica formateada al estándar IEEE. El formato de
   * salida se adapta al tipo de elemento
   * @returns Cadena de texto con la referencia bibliográfica
   */
  obtenerReferenciaIEEE(): string {
    const autoresStr = this.autores.join(' and ');
    switch (this.tipo.toLowerCase()) {
      case 'artículo de revista':
        return `${autoresStr}, "${this.titulo}", ${this.extras.revista || 'Rev.'}, vol. ${this.extras.volumen || '-'}, pp. ${this.paginas}, ${this.fechaPublicacion}.`;
      case 'capítulo de libro':
        return `${autoresStr}, "${this.titulo}", en ${this.extras.libro || 'Libro'}, ${this.editorial}, ${this.fechaPublicacion}, pp. ${this.paginas}.`;
      default:
        return `${autoresStr}, "${this.titulo}", ${this.editorial}, ${this.fechaPublicacion}.`;
    }
  }
}

