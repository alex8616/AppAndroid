import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import ApiUrl from '../config'; // Importa la URL base
import SvgUri from 'react-native-svg-uri';
import { RFValue } from 'react-native-responsive-fontsize';
import { Menu, Divider } from 'react-native-paper';

const FormularioOcupado = ({ route }) => {
  const navigation = useNavigation();
  const [mesaId, setMesaId] = useState(route.params?.mesaId || null);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [selectedCamarero, setSelectedCamarero] = useState(route.params?.selectedCamarero || null);
  const [selectedCliente, setSelectedCliente] = useState(route.params?.selectedCliente || null);
  const [comentario, setComentario] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: `Mesa #${mesaId} - Libre`,
      headerStyle: {
        backgroundColor: '#A1DD70',
        textAlign: 'center',
      },
      headerTintColor: '#fff',
    });

    if (route.params?.selectedCamarero) {
      setSelectedCamarero(route.params.selectedCamarero);
    }
    if (route.params?.selectedCliente) {
      setSelectedCliente(route.params.selectedCliente);
    }
  }, [navigation, route.params]);

  const handleIncrement = () => {
    setCantidadPersonas(cantidadPersonas + 1);
  };

  const handleDecrement = () => {
    if (cantidadPersonas > 1) {
      setCantidadPersonas(cantidadPersonas - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${ApiUrl}/registrar-consumo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CantidadPersonas: cantidadPersonas,
          cliente_id: selectedCliente ? selectedCliente.id : null,
          camarero_id: selectedCamarero ? selectedCamarero.id : null,
          ambiente_mesa_id: mesaId,
          Comentario: comentario,
        }),
      });
      console.log("Registro de consumo enviado");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      const data = await response.json();
      console.log('Registro enviado con éxito:', data);

      // Realizar la solicitud para obtener los datos de la mesa
      const mesaResponse = await fetch(`${ApiUrl}/get-mesa-ocupado/${mesaId}`);
      console.log("Solicitud de datos de mesa enviada");

      if (!mesaResponse.ok) {
        const mesaErrorData = await mesaResponse.json();
        throw new Error(mesaErrorData.message || 'Error al obtener los datos de la mesa');
      }

      const mesaData = await mesaResponse.json();
      console.log('Datos de la mesa obtenidos con éxito:', mesaData);

      // Reiniciar el stack de navegación y navegar a la vista DatosMesaOcupado
      navigation.dispatch(StackActions.replace('DatosMesaOcupado', {
        mesaId,
        mesaData, // Pasar los datos de la mesa
      }));
    } catch (error) {      
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerrow}>
        <SvgUri
          width="50"
          height="50"
          source={require('../utilidades/svg/people.svg')}
          style={styles.roundSvg}
        />
        <Text style={styles.label}>Cantidad de Personas</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.counterButton} onPress={handleDecrement}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputcant}
            keyboardType="numeric"
            value={String(cantidadPersonas)}
            editable={false}
          />
          <TouchableOpacity style={styles.counterButton} onPress={handleIncrement}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={styles.containerrow}>
        <SvgUri
          width="50"
          height="50"
          source={require('../utilidades/svg/camarero.svg')}
          style={styles.roundSvg}
        />
        <Text style={styles.label}>Seleccione Camarero</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => navigation.navigate('SeleccionarCamarero', { mesaId: mesaId })}
        >
          <Text style={styles.selectButtonText}>
            {selectedCamarero ? selectedCamarero.NombreCamarero : 'Seleccionar Camarero'}
          </Text>
        </TouchableOpacity>
      </View>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={styles.containerrow}>
        <SvgUri
          width="50"
          height="50"
          source={require('../utilidades/svg/cliente.svg')}
          style={styles.roundSvg}
        />
        <Text style={styles.label}>Seleccione Cliente</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => navigation.navigate('SeleccionarCliente', { mesaId: mesaId })}
        >
          <Text style={styles.selectButtonText}>
            {selectedCliente ? selectedCliente.NombreCliente : 'Seleccionar Cliente'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Divider style={{ marginBottom: 10 }}/>

      <Text style={styles.labelcoment}>Comentario</Text>
      <TextInput
        style={[styles.textArea, isFocused && styles.textAreaFocused]}
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  roundSvg: {
    width: 50,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    width: '50%',
    fontSize: RFValue(15),
    paddingLeft: 15,
    paddingTop: RFValue(5),
    color: '#555',
  },
  labelcoment: {
    fontSize: RFValue(15),
    paddingTop: RFValue(1),
    paddingBottom: RFValue(10),
    color: '#555',
  },
  counterContainer: {
    flexDirection: 'row',
  },
  inputcant: {
    width: '20%',
    color: 'black',
    textAlign: 'center',
    fontSize: RFValue(15),
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  counterButton: {
    margin: 0,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FDA403',
    borderRadius: 5,
  },
  counterButtonText: {
    margin: 0,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  selectButton: {
    justifyContent: 'center',
    width: RFValue(125),
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 16,
  },
  selectButtonText: {
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  containerrow: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  textAreaFocused: {
    borderColor: '#FF6500',
    borderWidth: 3,
    color: 'black'
  },
});

export default FormularioOcupado;
