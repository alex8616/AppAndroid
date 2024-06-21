// En el componente Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import loginStyles from '../utilidades/css/LoginStyles';
import ApiUrl from '../config';

const backgroundImage = require('../utilidades/img/fondo.jpg');

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${ApiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Home');
        console.log('Usuario:', data.user);
      } else {
        // Error en el inicio de sesión
        Alert.alert('Error', data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Error al iniciar sesión');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={loginStyles.background}>
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Inicio de Sesión</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
};

export default Login;