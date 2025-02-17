import { View } from 'react-native';
import { TextInput } from "react-native-paper";

import { InputTextProps } from "../../types/FormularioInterfaces";

export default function InputText({
  tipo, label, valor, desabilitar,
  actionAtualizarValor,
  estilosBox, estilosInput
}: InputTextProps) {
  return (
    <View style={ estilosBox }>
      <TextInput
        mode="outlined"
        label={ label }
        value={ valor }
        onChangeText={ actionAtualizarValor }
        // @ts-ignore
        keyboardType={ tipo }
        style={[ estilosInput ]}
        disabled={ desabilitar }
      />
    </View>
  );
}
