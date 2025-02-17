import { StyleSheet, Text, SectionList, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import ListagemInicioItem from "./Itens/ListagemInicioItem";

import { ListagemInicioProps } from "../../types/ListagemInterfaces";

export default function ListagemInicio( { titulo, dados, actionItem, actionButtonItemList } : ListagemInicioProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ styles.container }>
        <SectionList
          sections={[{ title: titulo, data: dados }]}
          renderItem={({ item }) => (
            <ListagemInicioItem 
              dados={ item }
              editarLista={ actionItem }
              removerLista={ actionButtonItemList }
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={ styles.header }>{ title }</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
  boxLista: {
    height: 50
  }
});
