import { Text, View } from "react-native";

import { ListagemOpcoesListaProps } from "../../types/ListagemInterfaces";

import ListagemOpcoesListaItem from "./Itens/ListagemOpcoesListaItem";

export default function ListagemOpcoesLista({ dados, estilos, acoes }: ListagemOpcoesListaProps) {
  if (!dados || dados.length === 0) return "";

  return (
    <View style={[ estilos ]} >
      {(
        dados.map((itemLista, index) => (
          <ListagemOpcoesListaItem key={ index } item={ itemLista  } indice={ index } acoes={ acoes } />
        ))
      )}
    </View>
  );
}