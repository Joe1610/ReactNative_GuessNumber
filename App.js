import {View, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/Colors';

function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  let content = <StartGameScreen confirmNumber={startGameHandler} />;
  if (userNumber && !gameIsOver) {
    content = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  // else if (gameIsOver && userNumber) {
  //   content = <GameOverScreen />;
  // }

  return (
    <View
      style={styles.rootScreen}
      colors={[Colors.primary700, Colors.accent500]}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        style={styles.rootScreen}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>{content}</SafeAreaView>
      </ImageBackground>
    </View>
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
