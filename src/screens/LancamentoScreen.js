import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../components/theme';
import { openDatabase } from '../database/db';

export default function LancamentoScreen() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => { carregarDados(); }, [data]);

  const carregarDados = async () => {
    const db = await openDatabase();
    const res = await db.getAllAsync('SELECT * FROM Funcionarios WHERE ativo = 1');
    setFuncionarios(res);
  };

  const registrar = async (fId, sit, vBase) => {
    const db = await openDatabase();
    let vFinal = sit === 'P' ? vBase : sit === 'M' ? vBase * 0.5 : 0;
    
    try {
      await db.runAsync(
        'INSERT OR REPLACE INTO Lancamentos (data, funcionario_id, situacao, valor_base, valor_final) VALUES (?, ?, ?, ?, ?)',
        [data, fId, sit, vBase, vFinal]
      );
      Alert.alert("Sucesso", "Lançamento salvo!");
    } catch (e) { console.error(e); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>Data: {data.split('-').reverse().join('/')}</Text>
      </View>

      <FlatList
        data={funcionarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <View style={styles.btnRow}>
              <TouchableOpacity onPress={() => registrar(item.id, 'P', item.valor_diaria)} style={[styles.btn, {backgroundColor: COLORS.presente}]}><Text style={styles.btnTxt}>P</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => registrar(item.id, 'F', item.valor_diaria)} style={[styles.btn, {backgroundColor: COLORS.falta}]}><Text style={styles.btnTxt}>F</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => registrar(item.id, 'M', item.valor_diaria)} style={[styles.btn, {backgroundColor: COLORS.meia}]}><Text style={styles.btnTxt}>M</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => registrar(item.id, 'E', item.valor_diaria)} style={[styles.btn, {backgroundColor: COLORS.extra}]}><Text style={styles.btnTxt}>E</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 10 },
  dateHeader: { padding: 15, alignItems: 'center' },
  dateText: { fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { width: 65, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnTxt: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});