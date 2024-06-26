import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.backgroundColor,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 30,
    marginTop: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: MyTheme.grey200,

    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 1,
    },
    shadowOpacity: 0.52,
    shadowRadius: 2.22,

    elevation: -2,
  },
  searchPress: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImage: {
    width: 14,
    height: 14,
    marginRight: 15.5,
  },
  searchInput: {
    width: '80%',
    paddingLeft: 16,
  },
  signupHeader: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    width: width - 40,
    height: 25,
    top: 70,
  },
  signUpHeaderText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 20,
    color: MyTheme.black,
    paddingTop: 5,
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
    width: width,
    marginTop: '3%',
  },
  register: {
    alignSelf: 'center',
    width: width - 40,
    height: 56,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.yellow,
  },
  registerText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.textPrimary,
  },
  emptyView: {
    width: width - 40,
    height: 186,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    zIndex: 1,
    backgroundColor: '#00000080',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  pickImage: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: '80%',
    color: MyTheme.textPrimary,
  },
  notPickImage: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: '80%',
    color: MyTheme.grey100,
  },
});
