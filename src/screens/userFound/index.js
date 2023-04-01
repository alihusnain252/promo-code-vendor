import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {TopHeader, BottomBar} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ArrowHeader} from '../../components';

export const UserFound = ({navigation}) => {
  const searchHandler = () => {
    navigation.navigate('VerifyOtp');
  };

  return (
    <View style={styles.userFoundContainer}>
      <ArrowHeader heading="User Found👋" />
      <View style={styles.userImageContainer}>
        <View style={styles.userImageView}>
          <Image
            source={require('../../assets/icons/userFound.png')}
            style={styles.userFoundImage}
          />
        </View>
        <Text style={styles.userText}>Jones King</Text>
      </View>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userDetails}>
          <Image
            source={require('../../assets/icons/userId.png')}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsText}>
            User ID: <Text style={styles.boldText}> U441256</Text>
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Image
            source={require('../../assets/icons/location.png')}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsText}>
            City:<Text style={styles.boldText}> Accra</Text>
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Image
            source={require('../../assets/icons/subscription.png')}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsText}>Subscription:</Text>
          <Text style={styles.subscription}> Active</Text>
        </View>
        <Pressable style={styles.sendSMS} onPress={() => searchHandler()}>
          <Text style={styles.sendSMSText}>Send SMS OTP</Text>
        </Pressable>
      </View>
    </View>
  );
};
