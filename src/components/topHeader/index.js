import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetRequest} from '../../api/apiCall';
import {vendorUris} from '../../utils';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';

export const TopHeader = () => {
  const navigation = useNavigation();

  const userToken = useSelector(token);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const userProfile = () => {
    setLoading(true);
    GetRequest(userToken.token, vendorUris.vendorProfile).then(res => {
      console.log('user Profile data', res.data);
      if (res.data.success === true) {
        setUserData(res.data.data);
        setLoading(false);
      } else {
        Alert.alert(res.data.message);
        setLoading(false);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      userProfile();
    }, []),
  );

  return (
    <View style={styles.topContainer}>
      <View style={styles.topBody}>
        <View style={styles.profile}>
          <Pressable onPress={() => navigation.navigate('AccountScreen')}>
            <Image
              source={
                userData.profile_pic
                  ? {uri: userData.profile_pic}
                  : require('../../assets/icons/profile.png')
              }
              style={styles.profileImage}
            />
          </Pressable>
        </View>
        <View style={styles.icon}>
          <Pressable>
            <Image
              source={require('../../assets/icons/icon.png')}
              style={styles.iconImage}
            />
          </Pressable>
        </View>
        <View style={styles.notification}>
          <Pressable onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={require('../../assets/icons/notification.png')}
              style={styles.notificationImage}
            />
            <View style={styles.dot}></View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
