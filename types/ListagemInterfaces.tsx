import { ItemModel, ListaListagemModel, ListaModel } from "./DatabaseInterfaces"

export interface ListagemInicioProps {
  titulo: string;
  dados: ListaListagemModel[];
  actionItem ?: (idLista: number) => void;
  actionButtonItemList ?: (idLista: number) => void;
};

export interface ListagemInicioItemProps {
  dados: ListaListagemModel;
  removerLista?: (idLista: number) => void;
  editarLista ?: (idLista: number) => void;
};

export interface ListagemOpcoesListaProps {
  dados?: ItemModel[];
  estilos?: object;
  acoes?: ListagemOpcoesListaAcoesProps;
}

export interface ListagemOpcoesListaItemProps {
  item?: ItemModel;
  indice?: number;
  acoes?: ListagemOpcoesListaAcoesProps;
}

export interface ListagemOpcoesListaAcoesProps {
  handleAtualizarItem: (indice: number, item: ItemModel) => void;
  handleRemoverItemDaLista?: (idItemLista: number) => void;
  handleAtualizarConclusao?: (idItemLista: number, concluido: string) => void;
};