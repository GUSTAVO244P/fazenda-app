import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from '../database/db';
import { COLORS } from '../components/theme';

export default function FuncionariosScreen({ navigation }) {
  const [lista, setLista] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregar);
    return unsubscribe;
  }, [navigation]);

  const carregar = async () => {
    const db = await openDatabase();
    const res = await db.getAllAsync('SELECT * FROM Funcionarios ORDER BY nome ASC');
    setLista(res);
  };

  const filtrados = lista.filter(f => f.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput placeholder="Buscar funcionário..." style={styles.search} onChangeText={setBusca} />
      
      <FlatList
        data={filtrados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Cadastro', { funcionario: item })}>
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>{item.funcao || 'Trabalhador Rural'} • R$ {item.valor_diaria}</Text>
            </View>
            <Text style={{ color: item.ativo ? 'green' : 'red' }}>{item.ativo ? 'Ativo' : 'Inativo'}</Text>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  item: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nome: { fontSize: 18, fontWeight: 'bold' },
  info: { color: '#666' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: COLORS.presente, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#fff', fontSize: 30 }
});