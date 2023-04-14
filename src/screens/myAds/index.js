import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Ads} from '@components';
import {ArrowHeader} from '../../components';

export const MyAds = ({navigation}) => {
  return (
    <View style={styles.myAdsContainer}>
      <ArrowHeader heading="My Ads" />
      <View style={styles.createAd}>
        <Pressable
          style={styles.createAdPress}
          onPress={() =>
            navigation.navigate('CreateAd', {adDetails: null, update: false})
          }>
          <Text style={styles.createAdText}>Create Ad</Text>
        </Pressable>
      </View>
      <View style={styles.adsView}>
        <Ads />
      </View>
    </View>
  );
};
