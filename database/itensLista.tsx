import { iniciarBancoDeDados } from "./instance";
import { ItemModel } from "../types/DatabaseInterfaces";

export async function consultarItensDeUmaLista(id: number): Promise<ItemModel[]> {
  const db = await iniciarBancoDeDados();
  // @ts-ignore
  return await db.getAllAsync<ItemModel>("SELECT * FROM itens WHERE idLista = ?;", [ id ]);
};

export async function cadastrarItensLista(dados: ItemModel[], idListaManual?: number) {
  let binds   = [];
  let valores = [];

  dados.map((item) => {
    if(item.nome !== undefined) {
      binds.push("(?, ?, ?)");

      if (item.valor === undefined || isNaN(item.valor)) {
        item.valor = null;
      }

      valores.push((item.idLista ?? idListaManual), item.nome, item.valor);
    }
  });

  const db 				= await iniciarBancoDeDados();
	const resultado = await db.runAsync(
    `INSERT INTO itens (idLista, nome, valor) VALUES ${binds.join(", ")};`,
    valores
  );

	return resultado.changes;
};

export async function removerItemLista(idItemLista: number) {
  const db = await iniciarBancoDeDados();
  await db.runAsync("DELETE FROM itens WHERE id = ?;", [ idItemLista ]);
};

export async function removerItensLista(idLista: number) {
  const db = await iniciarBancoDeDados();
  await db.runAsync("DELETE FROM itens WHERE idLista = ?;", [ idLista ]);
};

export async function atualizarItensLista(dados: ItemModel[]) {
  const db = await iniciarBancoDeDados();
  
  dados.map(async (obItemModel) => {
    await db.runAsync(
      "UPDATE itens SET nome = ?, valor = ? WHERE id = ?;", 
      [ obItemModel.nome, obItemModel.valor, obItemModel.id ]
    );
  });
};

export async function atualizarConclusao(idItemLista: number, conclusao: string) {
  const db = await iniciarBancoDeDados();
  await db.runAsync(
    "UPDATE itens SET concluido = ? WHERE id = ?;",
    [ conclusao, idItemLista ]
  );
};