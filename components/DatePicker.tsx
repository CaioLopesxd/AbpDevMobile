import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Fontisto from '@expo/vector-icons/Fontisto';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

type DatePickerProps = {
  date: Date | null;
  setDate: (date: Date) => void;
  isVisible: boolean;
  setVisibility: (visible: boolean) => void;
  text:string
};

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate, isVisible, setVisibility,text }) => {
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setVisibility(false); // Fecha o DateTimePicker no Android
    }
    if (selectedDate) {
      setDate(selectedDate); // Atualiza a data sem fechar o DateTimePicker
    }
  };

  const toggleVisibility = () => {
    setVisibility(!isVisible); // Abre ou fecha o DateTimePicker ao clicar no botão do calendário
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.timeContainer}>
      {date ? (
        <Text style={styles.buttonText}>{formatDate(date)}</Text>
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
      {Platform.OS === 'ios' ? (
        !isVisible && (
          <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
            <Fontisto name="date" size={16} color="white" />
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
          <Fontisto name="date" size={16} color="white" />
        </TouchableOpacity>
      )}
      {isVisible && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange} // Altera a data sem fechar o picker
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    justifyContent:"space-between",
   
  },
  button: {
    backgroundColor: '#ff6f61',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});