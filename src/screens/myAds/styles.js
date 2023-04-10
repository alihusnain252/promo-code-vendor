import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  myAdsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    width: width - 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  createAdPress: {
    width: 78,
    height: 22,
    backgroundColor: MyTheme.accent,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  createAdText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14,
    color: MyTheme.white,
  },
});
