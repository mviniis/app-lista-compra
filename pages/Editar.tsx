//COMPONENTS REACT
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

//APP COMPONENTS
import InputText from "../components/Inputs/InputText";
import BotaoCadastrar from "../components/Buttons/BotaoCadastrar";
import ListagemOpcoesLista from "../components/Lists/ListagemOpcoesLista";

//APP INTERFACES
import { ItemModel } from "../types/DatabaseInterfaces";
import { ListagemOpcoesListaAcoesProps } from "../types/ListagemInterfaces";

//ACTIONS PAGE
import {
  buscarLista,
  atualizarNome,
} from "../utils/ListaUtils";

import {
  buscarItensLista,
  cadastrarItens,
  removerItem,
  atualizarItens,
  atualizarConclusaoItem,
} from "../utils/ItemListaUtils";

export default function Editar({ route }) {
  const { id }                          = route.params;
  const navigation                      = useNavigation();
  const [ nomeLista, setNomeLista ]     = useState<string>("");
  const [ itensCompra, setItensCompra ] = useState<ItemModel[]>([]);
  const [ novosItens, setNovosItens ]   = useState<ItemModel[]>([]);

  useEffect(() => {
    buscarLista(id, setNomeLista, navigation);
    buscarItensLista(id, setItensCompra);
  }, [ id, novosItens ]);

  const atualizarLista = async () => {
    atualizarNome(id, nomeLista);
    atualizarItens(itensCompra);
    cadastrarItens(novosItens, setNovosItens);
  };

  const atualizarItensCadastrados = async () => {
    setItensCompra([]);
    buscarItensLista(id, setItensCompra);
  }

  const criarNovoItem = (): ItemModel => ({
    idLista: id,
    nome: "",
    concluido: "n",
  });

  const adicionarItemLista = () => {
    let novoItem = criarNovoItem();
    setNovosItens((anteriores) => [ ...anteriores, novoItem ]);
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
        return anteriores.filter((item, indice) => indice !== index);
      });
    },
  };

  const acoesItemExistente: ListagemOpcoesListaAcoesProps = {
    handleAtualizarItem(index: number, item: ItemModel) {
      setItensCompra((anteriores) => {
        let existem     = [...anteriores];
        existem[index] = item;
        return existem;
      });
    },
    handleRemoverItemDaLista(idItemLista: number) {
      removerItem(idItemLista);
      atualizarItensCadastrados();
    },
    handleAtualizarConclusao(idItemLista, concluido) {
      atualizarConclusaoItem(idItemLista, concluido);
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
              label="Salvar"
              action={ atualizarLista }
              estilos={[ styles.botaoSalvar ]}
            />
          </View>
        </View>
      </View>

      <ScrollView style={ styles.containerItensCompra } keyboardShouldPersistTaps="handled" >
        <ListagemOpcoesLista dados={ novosItens } acoes={ acoesNovoItem } />
        <ListagemOpcoesLista dados={ itensCompra } acoes={ acoesItemExistente } />
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
    justifyContent: "space-around"
  },
  botao: {
    width: "40%",
  },
  botaoAdicionar: {
    backgroundColor: "blue",
  },
  botaoSalvar: {
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
