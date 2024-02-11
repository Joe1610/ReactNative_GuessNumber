import {View, StyleSheet, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

const generateRandomNumber = (min, max, exclude) => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

let minBound = 1;
let maxBound = 100;
let initalId = Math.random().toString();

const GameScreen = ({userNumber, onGameOver}) => {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [aiGuesses, setAiGuesses] = useState([
    {id: initalId, text: initialGuess},
  ]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(aiGuesses.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBound = 1;
    maxBound = 100;
    initalId = Math.random().toString();
  }, []);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBound = currentGuess;
    } else {
      minBound = currentGuess + 1;
    }
    const nextGuess = generateRandomNumber(minBound, maxBound, currentGuess);
    setAiGuesses(prevGuesses => [
      {id: Math.random().toString(), text: nextGuess},
      ...prevGuesses,
    ]);
    setCurrentGuess(nextGuess);
  };

  return (
    <View style={styles.screenContainer}>
      <Title>AI Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={aiGuesses}
          renderItem={itemData => (
            <GuessLogItem
              guess={itemData.item.text}
              roundNumber={aiGuesses.length - itemData.index}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
