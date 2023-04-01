import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  notificationHeader: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    width: width - 40,
    height: 25,
    top: 70,
  },
  notificationHeaderText: {
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
    position: 'absolute',
    width: '100%',
    height: '80%',
    left: 20,
    top: 144,
  },
  notificationCard: {
    height: 68,
    width: width - 40,
    marginVertical: 6,
    marginHorizontal: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 8,
    backgroundColor: MyTheme.grey400,
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
