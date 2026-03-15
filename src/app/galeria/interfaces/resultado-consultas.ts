export interface EuropeanaResponse {
  items: Artwork[];
  // añade otros campos si los necesitas
}

export interface Artwork {
  title: string[];
  edmPreview: string[]; // Esta suele ser la URL de la imagen
  dcCreator?: string[];
  dcDescription?: string[];
  // Ajusta según la respuesta real de la API
}