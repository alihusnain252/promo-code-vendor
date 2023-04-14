import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  dashboardContainer: {
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
    borderColor: MyTheme.black,

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
  topPress: {
    flexDirection: 'row',
    width: width - 30,
    height: 110,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 8,
  },
  validateCustomer: {
    backgroundColor: MyTheme.primary,
    width: 160,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  validationText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20,
    color: MyTheme.textPrimary,
    marginTop: 10,
  },
  history: {
    width: width - 30,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.primary,
    borderRadius: 8,
    marginTop: 10,
  },
  images: {
    width: 35,
    height: 35,
  },
  historyImages: {
    width: 45,
    height: 65,
  },
});
