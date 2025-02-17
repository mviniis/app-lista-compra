import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function BotaoAdicionar() {
  const navigation = useNavigation();

  const irParaCadastro = () => {
    // @ts-ignore
    navigation.navigate("Cadastro");
  };

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={irParaCadastro}
      color="white"
      // @ts-ignore
      backgroundColor="green"
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    bottom: 0,
  },
});
