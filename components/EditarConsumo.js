import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ApiUrl from '../config';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const EditarConsumo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { consumoId } = route.params;

  const [consumoData, setConsumoData] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [mesasPorAmbiente, setMesasPorAmbiente] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // Estado para la mesa seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsumoData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-mesa-ocupado/${consumoId}`);
        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${text}`);
        }

        const data = JSON.parse(text);

        if (Array.isArray(data) && data.length === 0) {
          throw new Error('No se encontraron datos para este consumo.');
        }

        setConsumoData(data[0]);
      } catch (error) {
        console.error('Error fetching consumo data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-clientes`);
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error fetching clientes data:', error.message);
      }
    };

    const fetchAmbientes = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-ambientes`);
        const data = await response.json();
        setAmbientes(data);
      } catch (error) {
        console.error('Error fetching ambientes data:', error.message);
      }
    };

    fetchConsumoData();
    fetchClientes();
    fetchAmbientes();
  }, [consumoId]);

  
  const handleSave = async () => {
    try {
        const datosParaEnviar = {
            ...consumoData,
            mesa_id: mesaSeleccionada
        };
        const response = await fetch(`${ApiUrl}/update-consumo/${consumoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosParaEnviar),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Error actualizando los datos');
        }
        console.log('Datos recibidos del controlador:', data);
        console.log("Actualizado Exitosamente");
        // Forzar la recarga de datos al volver a DatosMesaOcupado
        const mesaId = data.data.ambiente_mesa_id;
        console.log("mis datos ", mesaId);

        navigation.navigate('DatosMesaOcupado', { mesaId, mesaData: null, reload: true });
    } catch (error) {
        console.error('Error updating consumo data:', error.message);
        setError(error.message);
    }
};



  const handleAmbienteChange = async (ambienteId) => {
    try {
      const response = await fetch(`${ApiUrl}/get-ambiente-seleccionado/${ambienteId}`);
      const data = await response.json();
      setMesasPorAmbiente(data[0].ambientemesas);
      setMesaSeleccionada(null); // Limpiar mesa seleccionada al cambiar de ambiente
      // Actualizar ambiente seleccionado en consumoData si es necesario
      if (consumoData && consumoData.ambiente_id !== ambienteId) {
        setConsumoData({ ...consumoData, ambiente_id: ambienteId });
      }
    } catch (error) {
      console.error(`Error fetching mesas for ambiente ${ambienteId}:`, error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6500" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {consumoData ? (
        <View>
          <Text style={styles.title}>EDITAR CONSUMO</Text>
          <TextInput
            label="Cantidad de Personas"
            value={String(consumoData.CantidadPersonas)}
            onChangeText={(text) => setConsumoData({ ...consumoData, CantidadPersonas: text })}
            style={styles.input}
          />
          <TextInput
            label="Comentario"
            value={consumoData.Comentario}
            onChangeText={(text) => setConsumoData({ ...consumoData, Comentario: text })}
            style={styles.input}
          />
          <Picker
            selectedValue={consumoData.cliente_id || ''}
            onValueChange={(itemValue) =>
              setConsumoData({ ...consumoData, cliente_id: itemValue === '' ? null : itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="Sin cliente Seleccionado - Vacio" value="" style={styles.pickerItem} />
            {clientes.map((cliente) => (
              <Picker.Item label={cliente.NombreCliente} value={cliente.id} key={cliente.id} style={styles.pickerItem} />
            ))}
          </Picker>

          <Text style={styles.title}>CAMBIAR MESA</Text>

          <Picker
            selectedValue={consumoData.ambiente_id || null} // Mantener selección del ambiente en consumoData
            onValueChange={(itemValue) => {
              handleAmbienteChange(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un ambiente" value={null} />
            {ambientes.map((ambiente) => (
              <Picker.Item label={ambiente.NombreAmbiente} value={ambiente.id} key={ambiente.id} style={styles.pickerItem} />
            ))}
          </Picker>

          {mesasPorAmbiente.length > 0 && (
            <View>
              <Picker
                selectedValue={mesaSeleccionada}
                onValueChange={(itemValue) => setMesaSeleccionada(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una mesa" value={null} />
                {mesasPorAmbiente
                  .filter((mesa) => mesa.estado === 'libre')
                  .map((mesa) => (
                    <Picker.Item label={`${mesa.NombreMesas} - ${mesa.id}`} value={mesa.id} key={mesa.id} style={styles.pickerItem} />
                  ))}
                </Picker>
            </View>
          )}

          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </Button>
        </View>
      ) : (
        <Text style={styles.noDataText}>No se encontraron datos para este consumo.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 20,
    },
    input: {
      marginBottom: 20,
      backgroundColor: 'white'
    },
    saveButton: {
      backgroundColor: 'black',
      borderRadius: 8,
      paddingVertical: 10,
      marginTop: 20,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 18,
    },
    noDataText: {
      fontSize: 18,
      color: 'black',
    },
    picker: {
      borderWidth: 1,
      color: 'black',
      backgroundColor: 'white',
      borderRadius: 8,
      marginBottom: 20,
    },
    pickerItem: {
      fontSize: 18,
      color: 'black',
      backgroundColor: 'white'
    },
  });

export default EditarConsumo;
