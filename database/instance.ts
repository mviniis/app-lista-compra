import * as SQLite from "expo-sqlite";

let database = null;

export async function iniciarBancoDeDados() {
  if (database !== null) return database;

  try {
    console.log("🔄 Iniciando criação do banco...");
    database = await SQLite.openDatabaseAsync("app_lista.db");
    console.log("✅ Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
  }
  return database;
}

export async function criarTabela() {
  const db = await iniciarBancoDeDados();

  try {
    console.log("🔄 Iniciando criação das tabelas...");

    await db.execAsync(`
			CREATE TABLE IF NOT EXISTS listas (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				nome TEXT NOT NULL
			);
			CREATE TABLE IF NOT EXISTS itens (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				idLista INTEGER NOT NULL,
				nome TEXT NOT NULL,
				valor REAL DEFAULT 0.00,
    		concluido TEXT CHECK(concluido IN ('s', 'n')) NOT NULL DEFAULT 'n'
			);
		`);

    console.log("✅ Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar as tabelas do banco de dados: ", error);
  }
}

export async function resetarTabelas() {
  const db = await iniciarBancoDeDados();

  try {
    console.log("⚠️ Resetando tabelas...");

    await db.execAsync(`
      DROP TABLE IF EXISTS itens;
      DROP TABLE IF EXISTS listas;
    `);

    await criarTabela(); // ✅ Agora recria as tabelas com o esquema correto

    console.log("✅ Tabelas resetadas e recriadas!");
  } catch (error) {
    console.error("❌ Erro ao resetar as tabelas: ", error);
  }
}