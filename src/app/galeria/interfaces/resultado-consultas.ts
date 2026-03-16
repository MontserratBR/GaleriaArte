export interface EuropeanaResponse {
  items: Artwork[];
  
}

export interface Artwork {
  title: string[];
  edmPreview: string[]; 
  dcCreator?: string[];
  dcDescription?: string[];
  
}