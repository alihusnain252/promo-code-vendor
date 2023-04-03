import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Ads, BottomBar, TopHeader} from '@components';
import { ArrowHeader } from '../../components';

export const MyAds = ({navigation}) => {



  return (
    <View style={styles.myAdsContainer}>
        <ArrowHeader heading="My Ads" />
      <View style={styles.top}>
        <Pressable
          style={styles.createAdPress}
          onPress={() => navigation.navigate('CreateAd')}>
          <Text style={styles.createAdText}>Create Ad</Text>
        </Pressable>
      </View>
      <View style={styles.adsView}>
        <Ads />
      </View>
    </View>
  );
};
