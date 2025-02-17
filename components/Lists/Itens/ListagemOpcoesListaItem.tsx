import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { ListagemOpcoesListaItemProps } from "../../../types/ListagemInterfaces";

import InputText from "../../Inputs/InputText";

export default function ListagemOpcoesListaItem({ item, indice, acoes }: ListagemOpcoesListaItemProps) {
	const [ nomeProduto, setNomeProduto ]     = useState<string>(item.nome);
	const [ valorProduto, setValorProduto ]   = useState<string>("");
  const [ itemConcluido, setItemConcluido ] = useState<boolean>(item.concluido === "s");
  const [ impedirConclusao, _ ]             = useState<boolean>(item.id === undefined);

	useEffect(() => {
		setValorProduto((item.valor ?? "").toString());
	}, [ indice ]);

	const handleAtualizarNomeProduto = (nome: string) => {
		setNomeProduto(nome);
		item.nome = nome;
    acoes.handleAtualizarItem(indice, item);
	}

  const handleRemoverItem = () => {
    if (
      acoes === undefined ||
      acoes.handleRemoverItemDaLista === undefined
    ) {
      return;
    }
    
    let id = (item.id === undefined) ? indice: item.id; 
    acoes.handleRemoverItemDaLista(id);
  }
	
	const handleAtualizarValorProduto = (valor: string) => {
		let valorFormatado = valor.replace(/[^0-9\.]/g, "");
		valorFormatado     = valorFormatado.replace(/\.{2,}/g, ".");

		setValorProduto(valorFormatado);
    item.valor = parseFloat(valorFormatado);
    acoes.handleAtualizarItem(indice, item);
  }

	const handleSalvarModificacaoConclusao = () => {
		if(impedirConclusao) return;
    modificarValorConclusaoItem(item.concluido === "s" ? "n" : "s");
	}

  const modificarValorConclusaoItem = (tipo: string) => {    
    item.concluido = tipo;
    setItemConcluido(tipo === "s");
    
    if(acoes !== undefined && acoes.handleAtualizarConclusao !== undefined) {
      acoes.handleAtualizarConclusao(item.id, tipo);
    }
  }

  return (
		<View style={[ estilos.container ]}>
      <View style={[ estilos.boxItem, estilos.boxItemText ]} >
        <InputText
          tipo="text"
          label="Nome do produto"
          valor={ nomeProduto }
          actionAtualizarValor={ handleAtualizarNomeProduto }
          estilosBox={[ estilos.item ]}
          estilosInput={[ estilos.itemInput ]}
          desabilitar={ itemConcluido }
        />

        <InputText
          tipo="numeric"
          label={ "Valor em reais (R$)" }
          valor={ valorProduto }
          actionAtualizarValor={ handleAtualizarValorProduto }
          estilosInput={[ estilos.itemInput ]}
          desabilitar={ itemConcluido }
        />
      </View>

      <View style={[ estilos.boxItem, estilos.boxItemIcones ]} >
        <IconButton
          icon="delete-outline"
          mode="contained"
          onPress={ handleRemoverItem }
          iconColor="white"
          style={[ estilos.itemIcone, estilos.iconeRemover ]}
        />
        
        <IconButton
          icon="check"
          mode="contained"
          onPress={ handleSalvarModificacaoConclusao }
          iconColor="white"
          style={
						(itemConcluido || impedirConclusao) ? 
						([ estilos.itemIcone ]):
						([ estilos.itemIcone, estilos.iconeSalvar ])
					}
        />
      </View>
    </View>
	)
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  boxItem: {
    flexWrap: "wrap",
  },
  boxItemText: {
    flex: 1,
  },
  boxItemIcones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    maxWidth: "15%",
  },
  item: {
    width: "100%",
  },
  itemInput: {
    width: "100%",
    marginBottom: 8,
  },
  itemIcone: {
    marginHorizontal: 4,
  },
	iconeRemover: {
		backgroundColor: "red",
	},
	iconeSalvar: {
		backgroundColor: "green",
	},
  debug: {
    borderColor: "red",
    borderWidth: 1,
  },
});