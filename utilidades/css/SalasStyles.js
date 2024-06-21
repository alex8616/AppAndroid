// LoginStyles.js

import { StyleSheet } from 'react-native';

const salasStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      row: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      button: {
        margin: 3,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      selectedContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        marginTop: 20,
      },
      selectedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      matrixContainer: {
        alignItems: 'center',
      },
      matrixRow: {
        flexDirection: 'row',
      },
      cell: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
      },
      occupiedCell: {
        backgroundColor: '#ffcccc',
      },
      emptyCell: {
        backgroundColor: '#ccffcc',
      },
      ambienteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
      ambienteButtonText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
      },
      ambienteButtonRed: {
        backgroundColor: '#A1DD70',
        borderColor: '#9DDE8B',
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderLeftWidth: 5,
        borderTopWidth: 5,
      },
});

export default salasStyles;
