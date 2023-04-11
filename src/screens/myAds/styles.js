import {StyleSheet, Dimensions} from 'react-native';
import {MyTheme} from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  myAdsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.backgroundColor,
  },
  createAd: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 30,
    justifyContent: 'flex-end',
  },
  createAdPress: {
    width: 78,
    height: 32,
    backgroundColor: MyTheme.primary,
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
    color: MyTheme.accent,
  },
});
