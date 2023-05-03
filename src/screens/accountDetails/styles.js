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
  signupHeader: {
    flexDirection: 'row',
    width: width - 40,
    height: 25,
  },
  imagesContainer: {
    flexDirection: 'row',
    width: width - 40,
    justifyContent:"space-between"
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
  },
  register: {
    alignSelf: 'center',
    height: 56,
    width: width - 40,
    height: 56,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.primary,
    marginBottom:'4%'
  },
  registerText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.textPrimary,
  },

  dateInput: {
    width: '80%',
    color: MyTheme.textPrimary,
  },
  datePress: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageView: {
    width: width/5,
    height: width/5,
    borderWidth: 1,
    borderColor: MyTheme.borderColor,
    borderRadius: 6,
    resizeMode:'cover',
    marginVertical: '3%',
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden',
  },
  profileImage: {
    width: (width/6),
    height: (width/6),
    
  },
});
