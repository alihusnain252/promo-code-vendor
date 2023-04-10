import {View, Text, Image, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export const BottomBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.bottomBarContainer}>
      <Pressable
        style={styles.iconView}
        onPress={() => navigation.navigate('MyAds')}>
        <Image
          source={require('../../assets/icons/myAds.png')}
          style={styles.icon}
        />
        <Text style={styles.iconText}>My Ads</Text>
      </Pressable>
      <Pressable
        style={styles.iconView}
        onPress={() => navigation.navigate('Dashboard')}>
        <Image
          source={require('../../assets/icons/home.png')}
          style={styles.icon}
        />
        <Text style={styles.iconText}>Home</Text>
      </Pressable>
      <Pressable
        style={styles.iconView}
        onPress={() => navigation.navigate('AccountScreen')}>
        <MaterialIcons name="person" size={21.67} color="#fff" />
        <Text style={styles.iconText}>Account</Text>
      </Pressable>
    </View>
  );
};
