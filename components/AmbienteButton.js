import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  button: {
    margin: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: '#333',
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  selectedButtonText: {
    color: 'white',
  },
});

const AmbienteButton = ({ id, nombre, onPress, isSelected }) => (
  <TouchableOpacity 
    style={[styles.button, isSelected ? styles.selectedButton : null]} 
    onPress={() => onPress(id)}
  >
    <Text style={[styles.buttonText, isSelected ? styles.selectedButtonText : null]}>{nombre}</Text>
  </TouchableOpacity>
);

export default AmbienteButton;
