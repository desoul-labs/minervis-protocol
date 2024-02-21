export interface Source {
  url: string;
  text: string;
}

export interface SearchQuery {
  query: string;
  sourceLinks: string[];
}
