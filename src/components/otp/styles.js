import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
  },
  textInput: {
    backgroundColor: MyTheme.accent,
    color: MyTheme.white,
    padding: 7,
    margin: 7,
    borderRadius: 5,
    textAlign: 'center',
  },
});
