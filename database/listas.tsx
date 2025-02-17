import { iniciarBancoDeDados } from "./instance";
import { ListaModel, ListaListagemModel } from "../types/DatabaseInterfaces";

export async function consultarListasCadastradas(): Promise<ListaListagemModel[]> {
  const db = await iniciarBancoDeDados();
  // @ts-ignore
  return await db.getAllAsync<ListaModel>(
    `
      SELECT 
        listas.id, 
        listas.nome, 
        COALESCE(SUM(COALESCE(itens.valor, 0)), 0.00) AS total 
      FROM listas
      LEFT JOIN itens ON listas.id = itens.idLista
      GROUP BY listas.id, listas.nome
      ORDER BY listas.id DESC;
    `
  );
}

export async function buscarListaPorID(idLista: number): Promise<ListaModel> {
  const db = await iniciarBancoDeDados();
  return await db.getFirstAsync(
    "SELECT * FROM listas WHERE id = ?;", 
    [ idLista ]
  );
}

export async function criarNovaLista(nome: string): Promise<number> {
  const db        = await iniciarBancoDeDados();
  const resultado = await db.runAsync(
    "INSERT INTO listas (nome) VALUES (?);",
    [ nome ]
  );

  return resultado.lastInsertRowId;
}

export async function alterarNomeLista(idLista: number, nome: string) {
  const db = await iniciarBancoDeDados();
  await db.runAsync(
    "UPDATE listas SET nome = ? WHERE id = ?;",
    [ nome, idLista ]
  );
}

export async function removerLista(idLista: number) {
  const db = await iniciarBancoDeDados();
  await db.runAsync(
    "DELETE FROM listas WHERE id = ?;",
    [ idLista ]
  );
}