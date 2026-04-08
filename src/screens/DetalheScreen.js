import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalheScreen({ route }) {
  const { info } = route.params || { info: "Sem dados" };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Detalhes do Lançamento</Text>
      <View style={styles.card}>
        <Text style={styles.text}>{info}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10 }
});