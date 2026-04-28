import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- PASSO 1: Criando o Stack Navigator ---
const Stack = createNativeStackNavigator();

// --- PASSO 2 & 3: TelaLista ---
function TelaLista({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // PASSO 3: Navegação com parâmetros
          <Pressable 
            style={styles.card} 
            onPress={() => navigation.navigate('Perfil', { id: item.id })}
          >
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.subText}>Ver detalhes →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

// --- PASSO 4, 5 & 6: TelaPerfil ---
function TelaPerfil({ route }) {
  // PASSO 4 & 5: Estados e recebimento do ID
  const { id } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Novo fetch baseado no ID recebido
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [id]); // Boa prática: id como dependência

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
  }

  // PASSO 6: Renderização dos detalhes
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.title}>{user?.name}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
        
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>{user?.phone}</Text>
        
        <Text style={styles.label}>Website:</Text>
        <Text style={styles.value}>{user?.website}</Text>
      </View>
    </View>
  );
}

// --- MAIN APP ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={TelaLista} options={{ title: 'Usuários' }} />
        <Stack.Screen name="Perfil" component={TelaPerfil} options={{ title: 'Detalhes do Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameText: { fontSize: 18, fontWeight: 'bold' },
  subText: { color: '#666', fontSize: 12 },
  profileContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  infoBox: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10 },
  label: { fontWeight: 'bold', color: '#888', marginTop: 10 },
  value: { fontSize: 18, color: '#444', marginBottom: 5 }
});