export interface ListaModel {
  id: number;
  nome: string;
}

export interface ListaListagemModel {
  id: number;
  nome: string;
  total?: number;
}

export interface ItemModel {
  id?: number;
  idLista?: number;
  nome?: string;
  valor?: number | null;
  concluido?: string;
}
