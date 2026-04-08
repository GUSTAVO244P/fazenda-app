import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { openDatabase } from '../database/db';

export default function RelatoriosScreen() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const carregarRelatorio = async () => {
      const db = await openDatabase();
      const res = await db.getAllAsync(`
        SELECT f.nome, COUNT(l.id) as faltas 
        FROM Funcionarios f 
        JOIN Lancamentos l ON f.id = l.funcionario_id 
        WHERE l.situacao = 'F' 
        GROUP BY f.id 
        ORDER BY faltas DESC
      `);
      setRanking(res);
    };
    carregarRelatorio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking de Faltas (Geral)</Text>
      <FlatList
        data={ranking}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text>{index + 1}º {item.nome}</Text>
            <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.faltas} faltas</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' }
});