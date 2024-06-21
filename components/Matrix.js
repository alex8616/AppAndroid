import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const CELL_SIZE = Math.floor(width / 10.5) - 2; // Adjust cell size with margin

const styles = StyleSheet.create({
  matrixContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  matrixRow: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  ambienteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ambienteButtonText: {
    color: '#fff',
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  ambienteButtonLibre: {
    backgroundColor: '#A1DD70',
    borderColor: '#9DDE8B',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },
  ambienteButtonOcupado: {
    backgroundColor: '#FF6868',
    borderColor: '#FF4C4C',
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },
});

const Matrix = ({ selectedAmbiente, onMesaPress }) => {
  const matrix = Array.from({ length: 10 }, () => Array(10).fill(null));
  if (selectedAmbiente && selectedAmbiente.ambientemesas) {
    selectedAmbiente.ambientemesas.forEach((mesa) => {
      const x = parseInt(mesa.PosisionY, 10);
      const y = parseInt(mesa.PosisionX, 10);
      if (x < 10 && y < 10) {
        matrix[y][x] = mesa;
      }
    });
  }

  return (
    <View style={styles.matrixContainer}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.matrixRow}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[
                styles.cell,
                { width: CELL_SIZE, height: CELL_SIZE },
              ]}
            >
              {cell ? (
                <TouchableOpacity
                  style={[
                    styles.ambienteButton,
                    cell.estado === 'libre' ? styles.ambienteButtonLibre : styles.ambienteButtonOcupado,
                  ]}
                  onPress={() => onMesaPress(cell.id, cell.estado)}
                >
                  <Text style={styles.ambienteButtonText}>{cell.id}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Matrix;
