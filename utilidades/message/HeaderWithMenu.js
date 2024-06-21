import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
  },
  rightButton: {
    marginRight: 15,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: RFValue(16)
  },
});

const HeaderWithMenu = ({ title, onMenuPress, isMenuOpen }) => {
  const navigation = useNavigation();

  const handleRightButtonPress = () => {
    // Lógica del botón de la derecha
    console.log('Botón de la derecha presionado');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#01204E',
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <SvgUri
            width="25"
            height="25"
            source={require('../svg/menu.svg')}
          />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={styles.title}>{title}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.rightButton} onPress={handleRightButtonPress}>
          <SvgUri
            width="25"
            height="25"
            source={require('../svg/reload.svg')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isMenuOpen]);

  return null;
};

export default HeaderWithMenu;
