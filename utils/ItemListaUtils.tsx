//DATABASE
import {
  atualizarItensLista,
  cadastrarItensLista,
  consultarItensDeUmaLista,
  removerItemLista,
  atualizarConclusao,
} from "../database/itensLista";

//TYPE DATABASE
import { ItemModel } from "../types/DatabaseInterfaces";

const buscarItensLista = async (
  id: number, action: (nomeLista: ItemModel[]) => void
) => {
  try {
    const itensLista = await consultarItensDeUmaLista(id);
    action(itensLista);
  } catch (error) {
    console.error(`❌ Não foi possível obter os itens da lista de ID '${id}'. `, error);
    console.error(error);
  }
};

const atualizarConclusaoItem = async (id: number, concluido: string) => {
  try {
    await atualizarConclusao(id, concluido);
    console.log(
      `✅ O status de conclusão do item de ID '${id}' de uma lista, foi atualizado!`
    );
  } catch (error) {
    console.error(
      `❌ Não foi possível atualizar o status de conclusão do item '${id}' de uma lista. `,
      error
    );
  }
};

const cadastrarItens = async (
  itensCadastro: ItemModel[],
  resetAction: (dados: ItemModel[]) => void
) => {
  if (itensCadastro.length == 0) return;

  try {
    await cadastrarItensLista(itensCadastro);
    console.log(
      "✅ Alguns itens foram adicionados a lista de ID " +
      itensCadastro[0].idLista
    );

    resetAction([]);
  } catch (error) {
    console.error("❌ Não foi possível adicionar novos itens a lista: ", error);
  }
};

const atualizarItens = async (itensAtualizar: ItemModel[]) => {
  if (itensAtualizar.length == 0) return;

  try {
    await atualizarItensLista(itensAtualizar);

    console.log(
      `✅ Alguns itens da lista de ID '${itensAtualizar[0].idLista}', foram atualizados!`
    );
  } catch (error) {
    console.error(
      `❌ Não foi possível atualizar os itens da lista de ID ${itensAtualizar[0].idLista}`,
      error
    );
  }
};

const removerItem = async (idItemLista: number) => {
  try {
    await removerItemLista(idItemLista);
    console.log(`✅ Item '${idItemLista}' foi removido com sucesso!`);
  } catch (error) {
    console.error(`❌ Não foi possível remover o item ${idItemLista}: `, error);
  }
};

export {
  buscarItensLista, atualizarConclusaoItem,
  cadastrarItens, atualizarItens, removerItem
};