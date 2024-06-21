import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ApiUrl from '../config';
import { useNavigation } from '@react-navigation/native';

const SeleccionarCamarero = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Buscar Camarero . . .`,
      headerStyle: {
        backgroundColor: '#01204E',
        textAlign: 'center',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const [camareros, setCamareros] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCamareros = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-camarero`);
        const data = await response.json();
        setCamareros(data);
      } catch (error) {
        console.error('Error fetching camareros:', error);
      }
    };

    fetchCamareros();
  }, []);

  const filteredCamareros = camareros.filter(camarero =>
    camarero.NombreCamarero.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar camarero..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredCamareros}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FormularioOcupado', { selectedCamarero: item })}
          >
            <Text style={styles.item}>{item.NombreCamarero}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
    borderColor: '#FF6500',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black'
  },
});

export default SeleccionarCamarero;
