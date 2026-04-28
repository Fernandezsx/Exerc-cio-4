import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
    Text, 
      View, 
        FlatList, 
          ActivityIndicator, 
            SafeAreaView 
            } from 'react-native';
            import { NavigationContainer } from '@react-navigation/native';
            import { createStackNavigator } from '@react-navigation/stack';

            // Componente da Tela de Lista de Posts
            const ListaPosts = () => {
              // PASSO 2: Criar estados posts e loading
                const [posts, setPosts] = useState([]);
                  const [loading, setLoading] = useState(true);

                    // PASSO 3: useEffect com fetch
                      useEffect(() => {
                          fetch('https://jsonplaceholder.typicode.com/posts')
                                .then((response) => response.json())
                                      .then((json) => {
                                              // PASSO 4: Salvar dados e mudar loading
                                                      setPosts(json);
                                                              setLoading(false);
                                                                    })
                                                                          .catch((error) => {
                                                                                  console.error(error);
                                                                                          setLoading(false);
                                                                                                });
                                                                                                  }, []);

                                                                                                    // PASSO 5: Renderização condicional (Loading)
                                                                                                      if (loading) {
                                                                                                          return (
                                                                                                                <View style={styles.center}>
                                                                                                                        <ActivityIndicator size="large" color="#0000ff" />
                                                                                                                              </View>
                                                                                                                                  );
                                                                                                                                    }

                                                                                                                                      // PASSO 6: Renderização da FlatList
                                                                                                                                        return (
                                                                                                                                            <SafeAreaView style={styles.container}>
                                                                                                                                                  <FlatList
                                                                                                                                                          data={posts}
                                                                                                                                                                  keyExtractor={({ id }) => id.toString()}
                                                                                                                                                                          renderItem={({ item }) => (
                                                                                                                                                                                    <View style={styles.postItem}>
                                                                                                                                                                                                <Text style={styles.title}>{item.title}</Text>
                                                                                                                                                                                                            <Text style={styles.body}>{item.body}</Text>
                                                                                                                                                                                                                      </View>
                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                        </SafeAreaView>
                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                          // PASSO 1: Criar o Stack Navigator
                                                                                                                                                                                                                                          const Stack = createStackNavigator();

                                                                                                                                                                                                                                          export default function App() {
                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                <NavigationContainer>
                                                                                                                                                                                                                                                      <Stack.Navigator>
                                                                                                                                                                                                                                                              <Stack.Screen 
                                                                                                                                                                                                                                                                        name="ListaPosts" 
                                                                                                                                                                                                                                                                                  component={ListaPosts} 
                                                                                                                                                                                                                                                                                            options={{ title: 'Feed de Posts' }} 
                                                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                                                          </Stack.Navigator>
                                                                                                                                                                                                                                                                                                              </NavigationContainer>
                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                const styles = StyleSheet.create({
                                                                                                                                                                                                                                                                                                                  container: {
                                                                                                                                                                                                                                                                                                                      flex: 1,
                                                                                                                                                                                                                                                                                                                          backgroundColor: '#fff',
                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                              center: {
                                                                                                                                                                                                                                                                                                                                  flex: 1,
                                                                                                                                                                                                                                                                                                                                      justifyContent: 'center',
                                                                                                                                                                                                                                                                                                                                          alignItems: 'center',
                                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                                              postItem: {
                                                                                                                                                                                                                                                                                                                                                  padding: 20,
                                                                                                                                                                                                                                                                                                                                                      borderBottomWidth: 1,
                                                                                                                                                                                                                                                                                                                                                          borderBottomColor: '#ccc',
                                                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                                                              title: {
                                                                                                                                                                                                                                                                                                                                                                  fontSize: 18,
                                                                                                                                                                                                                                                                                                                                                                      fontWeight: 'bold',
                                                                                                                                                                                                                                                                                                                                                                          marginBottom: 5,
                                                                                                                                                                                                                                                                                                                                                                              textTransform: 'capitalize',
                                                                                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                                                                                                  body: {
                                                                                                                                                                                                                                                                                                                                                                                      fontSize: 14,
                                                                                                                                                                                                                                                                                                                                                                                          color: '#666',
                                                                                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                            
