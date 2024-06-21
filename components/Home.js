import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Salas from './Salas';
import HeaderWithMenu from '../utilidades/message/HeaderWithMenu';
import CustomMenu from '../utilidades/message/CustomMenu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Home = () => {
  const route = useRoute();
  const { userName } = route.params;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAmbienteId, setSelectedAmbienteId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleAmbienteChange = (id) => {
    setSelectedAmbienteId(id);
  };

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((oldKey) => oldKey + 1);
    }, [])
  );

  return (
    <Provider>
      <View style={styles.container}>
        <HeaderWithMenu 
          title="Ambientes - Mesas" 
          onMenuPress={toggleMenu} 
          isMenuOpen={isMenuOpen}
        />
        <Salas 
          key={refreshKey} 
          selectedAmbienteId={selectedAmbienteId} 
          onAmbienteChange={handleAmbienteChange} 
        />
        <CustomMenu isOpen={isMenuOpen} onClose={closeMenu} name={userName} />
      </View>
    </Provider>
  );
};

export default Home;
