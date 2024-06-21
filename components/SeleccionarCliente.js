import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ApiUrl from '../config';
import { useNavigation } from '@react-navigation/native';

const SeleccionarCliente = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Buscar Cliente . . .`,
      headerStyle: {
        backgroundColor: '#01204E',
        textAlign: 'center',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-clientes`);
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter(cliente =>
    cliente.NombreCliente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar cliente..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredClientes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FormularioOcupado', { selectedCliente: item })}
          >
            <Text style={styles.item}>{item.NombreCliente}</Text>
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

export default SeleccionarCliente;
