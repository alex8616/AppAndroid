import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Divider, Text } from 'react-native-paper'; 
import SvgUri from 'react-native-svg-uri';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  menuContainer: {
    padding: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '65%',
    backgroundColor: 'white',
    zIndex: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  TituloPrincipal:{
    paddingLeft: 5,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold'
  }
});

const CustomMenu = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      <View style={styles.menuContainer}>
        <Text style={styles.TituloPrincipal}>Restaurante</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, padding: 20}}>
          <SvgUri
            width="25"
            height="25"
            source={require('../svg/mesa.svg')}
          />
          <Text style={{ color: 'black', fontSize: 20, padding: 10 }}>Mesas</Text>
        </View>
        
        <Divider style={{ marginBottom: 10 }}/>
        
        <Text style={styles.TituloPrincipal}>Configuracion</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, padding: 20}}>
          <SvgUri
            width="25"
            height="25"
            source={require('../svg/printer.svg')}
          />
          <Text style={{ color: 'black', fontSize: 20, padding: 10 }}>Impresora</Text>
        </View>

        <Divider style={{ marginBottom: 10 }}/>

        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, position: 'absolute', bottom: 0, left: 0, right: 0, paddingLeft: 20 }}>
          <Text style={{ color: 'black', fontSize: 20, padding: 10, width: '80%' }}>{name}</Text>
          <SvgUri style={{ width: '20%' }}
            width="25"
            height="25"
            source={require('../svg/out.svg')}
          />
        </View>
      </View>
    </View>
  );
};


export default CustomMenu;
