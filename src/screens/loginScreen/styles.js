import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.backgroundColor,
  },
  heading: {
    width: width - 40,
    height: 150,
    justifyContent: 'center',
  },
  headingText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    paddingTop: '2%',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 20,
    color: MyTheme.black,
  },
  welcomeText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
    color: MyTheme.grey100,
    paddingTop: '3%',
  },
  loginInputs: {
    width: width - 40,
  },
  input: {
    width: '100%',
    backgroundColor: MyTheme.grey,
    borderRadius: 8,
    marginBottom: '5%',
    paddingHorizontal: 15,
    color: MyTheme.textPrimary,
  },
  loginBtns: {
    width: width - 40,
  },
  recoverText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 14,
    color: MyTheme.grey100,
  },
  login: {
    width: width - 40,
    height: 56,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.primary,
  },
  loginText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.textPrimary,
  },
});
