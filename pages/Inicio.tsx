//REACT COMPONENTS
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

//APP COMPONENTS
import BotaoAdicionar from "../components/Buttons/BotaoAdicionar";
import ListagemInicio from "../components/Lists/ListagemInicio";

//INTERFACES DB
import { ListaListagemModel } from "../types/DatabaseInterfaces";

//ACTIONS PAGE
import { buscarTodasListas, remover as removerLista } from '../utils/ListaUtils';

export default function Inicio() {
  const navigator                         = useNavigation();
  const [ listasExibir, setListasExibir ] = useState<ListaListagemModel[]>([]);

  useFocusEffect(
    useCallback(() => {
      consultar();
    }, [ listasExibir ])
  );

  const consultar = async () => {
    buscarTodasListas(setListasExibir);
  };

  const remover = async (idLista: number) => {
    removerLista(idLista);
    consultar();
  }

  const editar = (idLista: number) => {
    // @ts-ignore
    navigator.navigate("Edição", { id: idLista });
  }

  return (
    <SafeAreaView style={ styles.container }>
      <ListagemInicio 
        titulo="Minhas listas de compras" 
        dados={ listasExibir }
        actionItem={ editar }
        actionButtonItemList={ remover }
      />

      <BotaoAdicionar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
