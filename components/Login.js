import * as React from 'react';
import { View, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import { TextInput, Button, Provider as PaperProvider, Snackbar, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ApiUrl from '../config';
import { getSnackbarStyle } from '../utilidades/message/getSnackbarStyle'; 
import { RFValue } from 'react-native-responsive-fontsize';

export default function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarType, setSnackbarType] = React.useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            setSnackbarMessage('Por favor, complete todos los campos.');
            setSnackbarType('warning');
            setSnackbarVisible(true);
            return;
        }

        try {
            const response = await fetch(`${ApiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data && data.user) {
                    const { name } = data.user;
                    navigation.navigate('Home', { userName: name });
                    console.log('Usuario:', data.user);
                    setSnackbarMessage('Inicio de sesión exitoso');
                    setSnackbarType('success');
                    setSnackbarVisible(true);
                } else {
                    setSnackbarMessage('Inicio de sesión fallido, por favor verifique sus credenciales');
                    setSnackbarType('error');
                    setSnackbarVisible(true);
                }
            } else {
                setSnackbarMessage(data.message || 'Error en el inicio de sesión');
                setSnackbarType('error');
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setSnackbarMessage('Error al iniciar sesión');
            setSnackbarType('error');
            setSnackbarVisible(true);
        }
    };

    return (
        <PaperProvider>
            <ImageBackground
                source={require('../utilidades/img/AnimatedShape.png')}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../utilidades/img/logo.png')}
                        style={styles.logo}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <Button mode="contained" onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </Button>
                    <Portal>
                        <Snackbar
                            visible={snackbarVisible}
                            onDismiss={() => setSnackbarVisible(false)}
                            duration={3000}
                            style={[styles.snackbar, getSnackbarStyle(snackbarType)]}
                            action={{
                                label: 'OK',
                                onPress: () => {
                                    setSnackbarVisible(false);
                                },
                            }}>
                            <Text style={styles.snackbarMessage}>{snackbarMessage}</Text>
                        </Snackbar>
                    </Portal>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Copyright © 2023 Alejandro Ventura Fuentes. All rights reserved
                    </Text>
                </View>
            </ImageBackground>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      marginTop: 120,
  },
  background: {
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
  },
  logo: {
      width: RFValue(350),
      height: RFValue(180),
      alignSelf: 'center',
      marginBottom: 30,
  },
  input: {
      padding: 5,
      marginBottom: 16,
      backgroundColor: 'white',
      borderRadius: 5,
      fontSize: RFValue(15)
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: '#FF6500',
    justifyContent: 'center',
    height: RFValue(50),
  },
  buttonText: {
    fontSize: RFValue(16), // Tamaño de fuente relativo
    lineHeight: RFValue(24), // Altura de línea relativa
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  snackbar: {
      alignSelf: 'center',
  },
  snackbarMessage: {
    fontSize: RFValue(12),
    color: '#fff',
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      paddingVertical: 8,
      paddingHorizontal: 16,
  },
  footerText: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: RFValue(9),
      color: '#FFFFFF',
  },
});
