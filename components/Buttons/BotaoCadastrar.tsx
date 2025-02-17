import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { BotaoCadastrarProps } from "../../types/FormularioInterfaces";

export default function botaoCadastrar({ label, action, estilos }: BotaoCadastrarProps) {
  return (
    <View>
      <Button
				mode="contained" 
				onPress={ action } 
				style={[ styles.botaoCadastro, estilos ]}
			> { label } </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  botaoCadastro: {
    marginTop: 10,
  },
});