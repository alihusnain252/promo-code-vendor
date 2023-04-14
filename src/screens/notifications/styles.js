import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.backgroundColor,
  },
  scrollView: {
    width: width - 38,
    height: '80%',
    marginTop: '5%',
  },
  notificationCard: {
    height: 68,
    width: width - 45,
    marginVertical: 6,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: MyTheme.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,

    elevation: 5,
  },
  notificationHeadings: {
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 16,
    color: MyTheme.black,
    marginTop: 14,
    marginLeft: 16,
  },
  notificationDescription: {
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 16,
    color: MyTheme.black,
    marginTop: 9,
    marginLeft: 16,
  },
});
