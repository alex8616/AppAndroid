import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiUrl from '../config';
import AmbienteButton from '../components/AmbienteButton';
import Matrix from '../components/Matrix';
import { Paragraph, useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

const Salas = ({ selectedAmbienteId, onAmbienteChange }) => {
  const [ambientes, setAmbientes] = useState([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-ambientes`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAmbientes(data);
        if (selectedAmbienteId) {
          fetchSelectedAmbiente(selectedAmbienteId);
        } else {
          setLoading(false); // Deja de cargar si no hay un ambiente seleccionado
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Deja de cargar en caso de error
      }
    };
    fetchData();
  }, [selectedAmbienteId]);

  const fetchSelectedAmbiente = useCallback(async (id) => {
    setLoading(true); // Inicia la carga
    try {
      const response = await fetch(`${ApiUrl}/get-ambiente-seleccionado/${id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setSelectedAmbiente(data[0]);
    } catch (error) {
      console.error('Error fetching selected ambiente:', error);
    } finally {
      setLoading(false); // Termina la carga
    }
  }, []);

  const handlePress = (id) => {
    fetchSelectedAmbiente(id);
    onAmbienteChange(id);
  };

  const handleMesaPress = (id, estado) => {
    if (estado === 'libre') {
      navigation.navigate('FormularioOcupado', { mesaId: id });
    } else {
      navigation.navigate('DatosMesaOcupado', { mesaId: id });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalScroll}
        showsHorizontalScrollIndicator={false}
      >
        {ambientes.map((ambiente) => (
          <AmbienteButton
            key={ambiente.id}
            id={ambiente.id}
            nombre={ambiente.NombreAmbiente}
            onPress={handlePress}
            isSelected={selectedAmbiente && selectedAmbiente.id === ambiente.id}
          />
        ))}
      </ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        selectedAmbiente && selectedAmbiente.ambientemesas.length > 0 ? (
          <View style={styles.selectedContainer}>
            <Matrix
              selectedAmbiente={selectedAmbiente}
              onMesaPress={handleMesaPress}
            />
          </View>
        ) : (
          <Paragraph style={[styles.noMesasMessage, { color: 'black' }]}>
            No hay mesas registradas en este ambiente.
          </Paragraph>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  horizontalScroll: {
    flexDirection: 'row',
    padding: 10,
  },
  selectedContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  noMesasMessage: {
    textAlign: 'center',
    fontSize:  RFValue(16),
    padding: '10%',
    paddingTop: '60%'
  },
});

export default Salas;
