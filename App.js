import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Importação de todas as telas das pastas src/screens
import HomeScreen from './src/screens/HomeScreen';
import LancamentoScreen from './src/screens/LancamentoScreen';
import FuncionariosScreen from './src/screens/FuncionariosScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import FechamentoScreen from './src/screens/FechamentoScreen';
import RelatoriosScreen from './src/screens/RelatoriosScreen';
import DetalheScreen from './src/screens/DetalheScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Menu Inferior (Tabs)
 * Agrupa as funções principais que o gerente usará no dia a dia.
 */
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lançar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Equipe') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Financeiro') {
            iconName = focused ? 'cash' : 'cash-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32', // Verde da fazenda
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 5 },
        headerStyle: { backgroundColor: '#2E7D32' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Lançar" component={LancamentoScreen} options={{ title: 'Lançamento Diário' }} />
      <Tab.Screen name="Equipe" component={FuncionariosScreen} options={{ title: 'Gerenciar Equipe' }} />
      <Tab.Screen name="Financeiro" component={FechamentoScreen} options={{ title: 'Fechamento de Pagos' }} />
    </Tab.Navigator>
  );
}

/**
 * Navegador Principal (Stack)
 * Contém o menu de abas e as telas que "abrem por cima" (formulários e detalhes).
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2E7D32' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* A tela "Main" carrega o menu de abas lá de cima */}
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        
        {/* Telas secundárias que abrem via navegação stack */}
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Ficha do Trabalhador' }} 
        />
        
        <Stack.Screen 
          name="Relatorios" 
          component={RelatoriosScreen} 
          options={{ title: 'Relatórios e Estatísticas' }} 
        />
        
        <Stack.Screen 
          name="Detalhe" 
          component={DetalheScreen} 
          options={{ title: 'Detalhes do Lançamento' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}