import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';

const GuessLogItem = ({guess, roundNumber}) => {
  return (
    <View style={styles.guessLogItem}>
      <Text style={styles.guessLogItemText}>#{roundNumber}</Text>
      <Text style={styles.guessLogItemText}>AI Guess: {guess} </Text>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
  guessLogItem: {
    padding: 12,
    marginVertical: 8,
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
  },
  guessLogItemText: {
    fontSize: 18,
  },
});
