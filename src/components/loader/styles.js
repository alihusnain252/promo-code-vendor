import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: MyTheme.background,
  },
  arrowPress: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  leftArrow: {
    width: 20,
    height: 20,
  },
  heading: {
    color: MyTheme.textDark,
    fontSize: 20,
    fontWeight: 600,
    fontWeight:'bold'
  },
});
