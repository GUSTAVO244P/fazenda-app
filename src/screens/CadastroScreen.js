import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { openDatabase } from '../database/db';
import { COMMON_STYLES } from '../components/theme';

export default function CadastroScreen({ navigation }) {
  const [form, setForm] = useState({ nome: '', valor: '', pix: '' });

  const salvar = async () => {
    if (!form.nome || !form.valor) return Alert.alert("Atenção", "Preencha Nome e Diária");
    const db = await openDatabase();
    await db.runAsync(
      'INSERT INTO Funcionarios (nome, valor_diaria, chave_pix) VALUES (?, ?, ?)',
      [form.nome, parseFloat(form.valor), form.pix]
    );
    Alert.alert("Sucesso", "Funcionário Cadastrado!");
    navigation.goBack();
  };

  return (
    <View style={{padding: 20}}>
      <TextInput placeholder="Nome Completo" style={COMMON_STYLES.input} onChangeText={t => setForm({...form, nome: t})} />
      <TextInput placeholder="Valor da Diária (R$)" keyboardType="numeric" style={COMMON_STYLES.input} onChangeText={v => setForm({...form, valor: v})} />
      <TextInput placeholder="Chave Pix" style={COMMON_STYLES.input} onChangeText={p => setForm({...form, pix: p})} />
      <Button title="SALVAR FUNCIONÁRIO" onPress={salvar} color="#2E7D32" />
    </View>
  );
}