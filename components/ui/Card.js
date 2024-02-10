import {View, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const Card = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 24,
    marginTop: 36,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // apply shadow on Android
    elevation: 4,
    // apply shadow on iOS
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.25,
  },
});
