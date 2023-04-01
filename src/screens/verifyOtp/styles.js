import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
 verifyOtpContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  verifyOtpHeader: {
    width: '100%',
    flexDirection: 'row',
    width: width - 40,
    height: 21,
    marginTop: 18,
    alignItems: 'center',
  },
  verifyOtpHeaderText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 21,
    color: MyTheme.black,
    marginLeft: 11,
  },
  verifyOtpBtn: {
    height: 56,
    width: width - 40,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.yellow,
  },
  notVerifyOtpBtn: {
    height: 56,
    width: width - 40,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.grey300,
  },
  verifyOtpText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.white,
  },
  notVerifyOtpText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.grey500,
  },
});
