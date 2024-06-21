import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ApiUrl from '../config';
import { useNavigation } from '@react-navigation/native';
import { Chip, Searchbar, Button } from 'react-native-paper';
import SvgUri from 'react-native-svg-uri';
import { RFValue } from 'react-native-responsive-fontsize';
import { Menu, Divider } from 'react-native-paper'; 

const { height } = Dimensions.get('window');

const DatosMesaOcupado = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Mesa #${mesaId} - Ocupado`,
      headerStyle: {
        backgroundColor: '#FF6868',
        textAlign: 'center',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const route = useRoute();
  const { mesaId, mesaData: initialMesaData } = route.params;

  const [mesaData, setMesaData] = useState(initialMesaData || null);
  const [loading, setLoading] = useState(!initialMesaData);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    const fetchMesaData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get-mesa-ocupado/${mesaId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener los datos de la mesa');
        }
        const data = await response.json();
        setMesaData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

      fetchMesaData();
  }, [mesaId, initialMesaData]);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6500" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const handleButtonPress = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: height / 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));
  };

  const EditConsumoButtonPress = (consumoId) => {
    navigation.navigate('EditarConsumo', { consumoId });
  };

  return (
    <View style={styles.container}>
      {mesaData ? (
        <View>
          <Button mode="contained" style={styles.botoinformacion} onPress={handleButtonPress}>
            <View style={styles.buttonContent}>
              <SvgUri
                width="35"
                height="35"
                source={require('../utilidades/svg/mesainfo.svg')}
                style={styles.roundSvg}
              />
              <Text style={styles.botoinformacionlabel}>
                {mesaData[0].CantidadPersonas} Persona
              </Text>
              {mesaData[0].cliente && mesaData[0].cliente.NombreCliente ? (
                <>
                  <Text style={styles.botoinformacionlabel}> - </Text>
                  <Text style={styles.botoinformacionlabel}>
                    {mesaData[0].cliente.NombreCliente}
                  </Text>
                </>
              ) : null}
            </View>
          </Button>


          <Text style={styles.title}>Datos de la Mesa</Text>

          <Text style={styles.content}>{JSON.stringify(mesaData, null, 8)}</Text>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
            style={styles.modalinfo}
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
              <Animated.View style={[styles.modalContent, { top: slideAnim }]}>
                <Text style={styles.labeltitle}>DETALLE DE LA MESA</Text>

                <Divider style={styles.divider} />

                <View style={styles.containerrow}>
                  <SvgUri
                    width="50"
                    height="50"
                    source={require('../utilidades/svg/people.svg')}
                    style={styles.roundSvg}
                  />
                  <View style={styles.containerdate}>
                    <Text style={styles.label}>Cantidad de Personas</Text>
                    <Text style={styles.labelinfo}>
                      {mesaData[0].CantidadPersonas}
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.containerrow}>
                  <SvgUri
                    width="50"
                    height="50"
                    source={require('../utilidades/svg/camarero.svg')}
                    style={styles.roundSvg}
                  />
                  <View style={styles.containerdate}>
                    <Text style={styles.label}>Camarero</Text>
                    <Text style={styles.labelinfo}>
                      {mesaData[0].camarero?.NombreCamarero || 'No disponible'}
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.containerrow}>
                  <SvgUri
                    width="50"
                    height="50"
                    source={require('../utilidades/svg/cliente.svg')}
                    style={styles.roundSvg}
                  />
                  <View style={styles.containerdate}>
                    <Text style={styles.label}>Cliente</Text>
                    <Text style={styles.labelinfo}>
                    {`${mesaData[0].cliente?.NombreCliente || 'No disponible'} - ${mesaData[0].cliente?.TelefonoCliente || 'No disponible'}`}
                    </Text>
                    <Text style={styles.labelinfo}>
                      {mesaData[0].cliente?.EmailCliente || 'No disponible'}
                    </Text>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.containerrowfooter}>
                  <Button mode="contained" onPress={() => EditConsumoButtonPress(mesaData[0].ambiente_mesa_id)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                  </Button>
                  <Button mode="contained" onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>                    
                  </Button>
                </View>
                
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        </View>
      ) : (
        <Text style={styles.noDataText}>No se encontraron datos para esta mesa.</Text>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  botoinformacion: {
    width: '100%',
    backgroundColor: '#38419D',
    paddingTop: 13,
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botoinformacionlabel: {
    fontSize: RFValue(16),
    color: '#FFFFFF',
  },
  roundSvg: {
    width: RFValue(45),
    height: RFValue(45),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  titlechip: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  content: {
    fontWeight: 'bold',
    color: 'black'
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  noDataText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height / 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 25
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    borderRadius: 8,
    marginTop: 40,
    backgroundColor: 'red',
    width: '45%',
    height: '60%',
    padding: 8
  },
  editButton: {
    borderRadius: 8,
    marginTop: 40,
    backgroundColor: 'white',
    width: '45%',
    borderWidth: 1,
    borderColor: 'black',
    height: '60%',
    padding: 8
  },
  containerrow: {
    width: '100%',
    justifyContent: 'left',
    flexDirection: 'row',
  },
  containerdate: {
    width: '100%',
    justifyContent: 'left',
  },
  containerrowfooter: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    width: '50%',
    fontSize: RFValue(13),
    paddingLeft: 15,
    paddingTop: RFValue(5),
    color: '#555',
  },
  labelinfo: {
    width: '100%',
    fontSize: RFValue(12),
    paddingLeft: 15,
    paddingTop: RFValue(5),
    color: '#6B728E',
  },
  labeltitle: {
    textAlign: 'left',
    fontSize: RFValue(15),
    paddingTop: RFValue(5),
    color: '#555',
  },
  editButtonText: {
    color: 'black',
    fontSize: RFValue(12),
  },
  closeButtonText: {
    padding: 10,
    width: '100%',
    height: '100%',
    color: 'white',
    fontSize: RFValue(12),
  },
  divider: {
    marginVertical: 10,
    backgroundColor: '#ccc',
    height: 1,
    width: '100%',
  },
});

export default DatosMesaOcupado;
