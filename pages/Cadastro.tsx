//REACT COMPONENTS
import { useState } from 'react';
import { StyleSheet, View, Keyboard, ScrollView } from "react-native";

//APP COMPONENTS
import InputText from '../components/Inputs/InputText';
import BotaoCadastrar from "../components/Buttons/BotaoCadastrar";

//ACTIONS PAGES
import { cadastrarLista } from '../utils/ListaUtils';
import ListagemOpcoesLista from '../components/Lists/ListagemOpcoesLista';

//APP INTERFACES
import { ItemModel } from '../types/DatabaseInterfaces';
import { ListagemOpcoesListaAcoesProps } from '../types/ListagemInterfaces';

export default function Cadastro() {
  const [ nomeLista, setNomeLista ]   = useState<string>("");
  const [ novosItens, setNovosItens ] = useState<ItemModel[]>([]);

  const handleCadastro = async () => {
    cadastrarLista(nomeLista, setNomeLista, novosItens);
    setNovosItens([]);
  }

  const criarNovoItem = (): ItemModel => ({
    nome: "",
    concluido: "n",
  });

  const adicionarItemLista = () => {
    let novoItem = criarNovoItem();
    setNovosItens((anteriores) => [...anteriores, novoItem]);
  };

  const acoesNovoItem: ListagemOpcoesListaAcoesProps = {
    handleAtualizarItem(index: number, item: ItemModel) {
      setNovosItens((anteriores) => {
        let itens = [...anteriores];
        itens[index] = item;
        return itens;
      });
    },
    handleRemoverItemDaLista(index: number | null) {
      setNovosItens((anteriores) => {
        return anteriores.filter((_, indice) => indice !== index);
      });
    },
  };

  return (
    <View style={ styles.container }>
      <View style={[ styles.boxNomeAndAcoes ]}>
        <InputText
          tipo="text"
          label="Nome da lista de compras"
          valor={ nomeLista }
          actionAtualizarValor={ setNomeLista }
        />

        <View style={[ styles.boxBotao ]}>
          <View style={[ styles.botao ]}>
            <BotaoCadastrar
              label="Adicionar"
              action={ adicionarItemLista }
              estilos={[ styles.botaoAdicionar ]}
            />
          </View>
          
          <View style={[ styles.botao ]}>
            <BotaoCadastrar
              label="Cadastrar"
              action={ handleCadastro }
              estilos={[ styles.botaoCadastrar ]}
            />
          </View>
        </View>
      </View>

      <ScrollView style={ styles.containerItensCompra } keyboardShouldPersistTaps="handled" >
        <ListagemOpcoesLista dados={ novosItens } acoes={ acoesNovoItem } />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  boxNomeAndAcoes: {
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
  },
  boxBotao: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botao: {
    width: "40%",
  },
  botaoAdicionar: {
    backgroundColor: "blue",
  },
  botaoCadastrar: {
    backgroundColor: "green",
  },
  containerItensCompra: {
    overflow: "scroll",
  },
  avoidKeyboard: {
    maxHeight: 380,
  },
  debug: {
    borderWidth: 1,
    borderColor: "red",
  },
});
