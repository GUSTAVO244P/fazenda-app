import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../components/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Fazenda Boa Esperança</Text>
      
      <View style={styles.grid}>
        <MenuBtn title="Lançar" icon="calendar" color={COLORS.presente} onPress={() => navigation.navigate('Lançamentos')} />
        <MenuBtn title="Equipe" icon="people" color={COLORS.extra} onPress={() => navigation.navigate('Equipe')} />
        <MenuBtn title="Financeiro" icon="cash" color={COLORS.meia} onPress={() => navigation.navigate('Financeiro')} />
        <MenuBtn title="Relatórios" icon="stats-chart" color="#666" onPress={() => navigation.navigate('Relatorios')} />
      </View>
    </View>
  );
}

const MenuBtn = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
    <Ionicons name={icon} size={32} color={color} />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background, justifyContent: 'center' },
  welcome: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center', borderLeftWidth: 5 },
  cardText: { marginTop: 10, fontWeight: 'bold', fontSize: 16 }
});