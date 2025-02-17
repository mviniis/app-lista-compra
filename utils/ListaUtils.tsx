//COMPONENTS REACT
import { Keyboard } from "react-native";

//TYPES DB
import { ItemModel, ListaListagemModel } from "../types/DatabaseInterfaces";

//DATABASE
import { 
  alterarNomeLista, buscarListaPorID, consultarListasCadastradas,
  criarNovaLista, removerLista
} from "../database/listas";
import { cadastrarItensLista, removerItensLista } from "../database/itensLista";

const buscarTodasListas = async (action: (itens: ListaListagemModel[]) => void) => {
  try {
    const listas = await consultarListasCadastradas();
    action(listas);
  } catch (error) {
    console.error(`❌ Não foi possível consultas as listas disponíveis.`, error);
  }
};

const buscarLista = async (
  id: number, action: (nomeLista: string) => void, navigation: any
) => {
  try {
    const lista = await buscarListaPorID(id);
    action(lista.nome);
  } catch (error) {
    console.error(`❌ Lista com o ID '${id}' não foi encontrada! `, error);
    navigation.goBack();
  }
};

const atualizarNome = async (id: number, nomeLista: string) => {
  try {
    Keyboard.dismiss();
    await alterarNomeLista(id, nomeLista);
    console.log("✅ Nome da lista com o ID: " + id + " foi atualizado!");
  } catch (error) {
    console.error(`❌ Não foi possível atualizar o nome da lista ${id}. `, error);
  }
};

const cadastrarLista = async (
  nomeLista: string,
  action: (valor: string) => void,
  itensLista?: ItemModel[]
) => {
  try {
    Keyboard.dismiss();
    const idLista = await criarNovaLista(nomeLista);
    
    console.log("✅ Lista criada com ID: ", idLista);
    
    action("");
    if(itensLista !== undefined) cadastrarItensLista(itensLista, idLista);
  } catch (error) {
    console.error("❌ Não foi possível cadastrar a lista:", error);
  }
};

const remover = async (id: number) => {
  try {
    await removerItensLista(id);
    await removerLista(id);
    
    console.log(`✅ Lista com o ID '${id}', foi removida com sucesso!`);
  } catch (error) {
    console.error(
      `❌ Não foi possível remover a lista ${id}. `,
      error
    );
  }
};

export {
  buscarTodasListas, buscarLista,
  atualizarNome, cadastrarLista, remover,
};