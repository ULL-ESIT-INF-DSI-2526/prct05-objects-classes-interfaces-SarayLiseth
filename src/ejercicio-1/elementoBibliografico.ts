export class ElementoBibliografico {
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

