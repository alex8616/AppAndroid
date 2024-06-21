import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './components/Login';
import Home from './components/Home';
import Salas from './components/Salas';
import FormularioOcupado from './components/FormularioOcupado';
import SeleccionarCamarero from './components/SeleccionarCamarero';
import SeleccionarCliente from './components/SeleccionarCliente';
import DatosMesaOcupado from './components/DatosMesaOcupado';
import EditarConsumo from './components/EditarConsumo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Salas" component={Salas} />
        <Stack.Screen name="FormularioOcupado" component={FormularioOcupado} />
        <Stack.Screen name="SeleccionarCamarero" component={SeleccionarCamarero} />
        <Stack.Screen name="SeleccionarCliente" component={SeleccionarCliente} />
        <Stack.Screen name="DatosMesaOcupado" component={DatosMesaOcupado} />
        <Stack.Screen name="EditarConsumo" component={EditarConsumo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Deshabilitar advertencias en desarrollo
if (__DEV__) {
  console.warn = () => {};
}
export default App;
