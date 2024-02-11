import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';

function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = rounds => {
    setGameIsOver(true);
    setGuessRounds(rounds);
  };

  const newGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let content = <StartGameScreen confirmNumber={startGameHandler} />;
  if (userNumber && !gameIsOver) {
    content = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (gameIsOver && userNumber) {
    content = (
      <GameOverScreen
        roundsCount={guessRounds}
        userNumber={userNumber}
        onNewGame={newGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        style={styles.rootScreen}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>{content}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default App;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
