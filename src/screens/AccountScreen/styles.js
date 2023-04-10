import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    backgroundColor: MyTheme.yellow,
  },
  accountHeader: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    width: width - 40,
    height: 25,
    left: 15,
    top: 40,
  },
  accountBody: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 162,
    backgroundColor: MyTheme.grey600,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageView: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: -45,
    borderWidth: 2,
    borderColor: MyTheme.green200,
    borderRadius: 59,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius:59
  },
  userName: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 18,
    color: MyTheme.black,
    marginTop: 51,
  },
  userMail: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 18,
    color: MyTheme.grey100,
    marginTop: 2,
  },
  memberSince: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 12,
    lineHeight: 18,
    color: MyTheme.grey100,
    marginTop: 3,
  },
  accountBtns: {
    width: width - 40,
    marginTop: 17,
  },
  accountButton: {
    width: '100%',
    height: 32,
    borderBottomColor: MyTheme.grey700,
    borderBottomWidth: 1,
    marginTop: 11,
  },
  accountButtonText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 18,
    color: MyTheme.black,
  },
  logoutView: {
    width: width - 46,
    alignItems: 'flex-end',
    marginTop: 25,
  },
  logoutPress: {
    flexDirection: 'row',
  },
  logoutIcon: {
    width: 17.5,
    height: 16.67,
  },
  logoutText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    color: MyTheme.FireOpal,
    marginLeft: 5,
  },
});
