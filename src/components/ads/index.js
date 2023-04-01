import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import image from '../../assets/images/image8.png';
import {AdCard} from '../adCard';

export const Ads = () => {
  return (
    <View style={styles.adsContainer}>
      <ScrollView style={styles.scroll}>
        <AdCard />
        <AdCard />
        <AdCard />
      </ScrollView>
    </View>
  );
};
