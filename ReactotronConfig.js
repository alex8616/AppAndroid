import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    name: 'Tu nombre de aplicación', // Cambia este nombre por el de tu app
    host: 'localhost', // Opcional: Cambia la dirección IP si la necesitas
  })
  .connect(); // Inicia la conexión con Reactotron
