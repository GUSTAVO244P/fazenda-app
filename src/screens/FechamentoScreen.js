import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import { openDatabase } from '../database/db';

export default function FechamentoScreen() {
  const [resumo, setResumo] = useState([]);

  const gerarFechamento = async () => {
    const db = await openDatabase();
    const query = `
      SELECT f.nome, f.chave_pix, SUM(l.valor_final) as total, COUNT(l.id) as dias 
      FROM Funcionarios f 
      JOIN Lancamentos l ON f.id = l.funcionario_id 
      GROUP BY f.id
    `;
    const res = await db.getAllAsync(query);
    setResumo(res);
  };

  const compartilhar = async () => {
    let texto = "*FECHAMENTO FAZENDA BOA ESPERANÇA*\n\n";
    resumo.forEach(r => {
      texto += `👤 ${r.nome}\n💰 Total: R$ ${r.total.toFixed(2)}\n🔑 Pix: ${r.chave_pix}\n----------\n`;
    });
    Alert.alert("Resumo Copiado", "Envie para o WhatsApp do proprietário!");
    console.log(texto); // Aqui você usaria o Share.share do React Native
  };

  return (
    <View style={styles.container}>
      <Button title="CALCULAR TUDO" onPress={gerarFechamento} color="#2E7D32" />
      <ScrollView>
        {resumo.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={{fontWeight: 'bold'}}>{item.nome}</Text>
            <Text>Valor a pagar: R$ {item.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
      {resumo.length > 0 && <Button title="COMPARTILHAR WHATSAPP" onPress={compartilhar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' }
});