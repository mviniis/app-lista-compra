import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { ListagemInicioItemProps } from "../../../types/ListagemInterfaces";

export default function ListagemInicioItem({ dados, removerLista, editarLista }: ListagemInicioItemProps) {
  return (
    <Pressable onPress={() => editarLista(dados.id)}>
      <View style={styles.container}>
        <View style={styles.itemText}>
          <Text style={styles.title}>{dados.nome}</Text>
          <Text style={styles.title}>R$ {dados.total}</Text>
        </View>

        <View style={styles.itemIcone}>
          <IconButton
            icon="delete-outline"
            mode="contained"
            onPress={() => removerLista(dados.id)}
            iconColor="white"
            style={styles.iconeRemover}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(225, 225, 225) ",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    width: "80%",
  },
  itemIcone: {
    width: "20%",
  },
  title: {
    fontSize: 20,
  },
  iconeRemover: {
    backgroundColor: "red",
  },
});