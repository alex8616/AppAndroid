// LoginStyles.js

import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff', // Cambia el color del texto para que sea visible en la imagen de fondo
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'red', // Cambia el color de fondo del input para que sea visible en la imagen de fondo
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default loginStyles;
