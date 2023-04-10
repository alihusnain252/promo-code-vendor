import {View, Text, Pressable, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileImage from '../../assets/icons/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from '@redux/tokenSlice';
import {GetRequest} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';
import {token} from '../../redux/tokenSlice';
import {useFocusEffect} from '@react-navigation/native';

export const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
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
    <View style={styles.accountContainer}>
      <View style={styles.accountHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#000" />
        </Pressable>
      </View>
      <View style={styles.accountBody}>
        <View style={styles.profileImageView}>
          <Image
            source={
              userData.profile_pic ? {uri: userData.profile_pic} : ProfileImage
            }
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>
          {userData.name ? userData.name : 'User Name'}
        </Text>
        <Text style={styles.userMail}>
          {userData.email ? userData.email : '@johnSmith'}
        </Text>
        <Text style={styles.memberSince}>Member Since: 23 Mar 2023</Text>
        <View style={styles.accountBtns}>
          <Pressable
            style={styles.accountButton}
            onPress={() => navigation.navigate('AccountDetails',{profileDetails:userData})}>
            <Text style={styles.accountButtonText}>Account Detail</Text>
          </Pressable>
          <Pressable style={styles.accountButton}>
            <Text style={styles.accountButtonText}>About Saver Buddy</Text>
          </Pressable>
          <Pressable style={styles.accountButton} onPress={()=>navigation.navigate("UpdatePassword")} >
            <Text style={styles.accountButtonText}>Update Password</Text>
          </Pressable>
          {/* <Pressable style={styles.accountButton}>
            <Text style={styles.accountButtonText}>Notifications</Text>
          </Pressable> */}
        </View>
        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.yellow} />
        </View>
        <View style={styles.logoutView}>
          <Pressable
            style={styles.logoutPress}
            onPress={() => dispatch(updateToken(''))}>
            <Image
              source={require('../../assets/icons/logout.png')}
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
