import React, { createContext, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// PASSO 1: Criando o Contexto
// Ele precisa estar fora dos componentes para ser exportável/acessível
const AuthContext = createContext();

// --- TELA HOME ---
function HomeScreen() {
  // PASSO 4: Consumindo o contexto
  const { usuario } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Inicial</Text>
      <Text style={styles.info}>Olá, <Text style={styles.bold}>{usuario}</Text>!</Text>
    </View>
  );
}

// --- TELA PERFIL ---
function PerfilScreen() {
  // PASSO 5: Consumindo o contexto e a função de atualizar
  const { usuario, setUsuario } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Perfil</Text>
      <Text style={styles.info}>Status atual: {usuario}</Text>
      
      <View style={styles.buttonGap}>
        <Button 
          title="Fazer Login (João Silva)" 
          onPress={() => setUsuario('João Silva')} 
          color="#4CAF50"
        />
        
        <Button 
          title="Logout" 
          onPress={() => setUsuario('Visitante')} 
          color="#f44336"
        />
      </View>
    </View>
  );
}

// --- COMPONENTE PRINCIPAL (App.js) ---
const Tab = createBottomTabNavigator();

export default function App() {
  // PASSO 2: Criando o estado que será global
  const [usuario, setUsuario] = useState('Visitante');

  return (
    // PASSO 3: Envolvendo a navegação com o Provider
    // Tudo que estiver dentro de AuthContext.Provider tem acesso ao 'value'
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// Estilização básica
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonGap: {
    marginTop: 20,
    gap: 10, // Funciona no React Native moderno (Expo Go atualizado)
  },
});