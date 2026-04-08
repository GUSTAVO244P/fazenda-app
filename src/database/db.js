import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('fazenda.db');
  
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS Funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      apelido TEXT,
      funcao TEXT,
      valor_diaria REAL NOT NULL,
      chave_pix TEXT,
      tipo_chave_pix TEXT,
      telefone TEXT,
      observacao TEXT,
      ativo INTEGER DEFAULT 1,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS Lancamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      funcionario_id INTEGER,
      situacao TEXT CHECK(situacao IN ('P', 'F', 'M', 'E')),
      valor_base REAL,
      valor_extra REAL DEFAULT 0,
      valor_final REAL,
      observacao TEXT,
      FOREIGN KEY (funcionario_id) REFERENCES Funcionarios (id)
    );
  `);
  return db;
};