import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArrowHeader} from '../../components';
import {PostRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {MyTheme, vendorUris} from '../../utils';

export const UserFound = ({route, navigation}) => {
  const userToken = useSelector(token);

  const {userDetails} = route.params;

  const [loading, setLoading] = useState(false);
  console.log('Founded userDetails', userDetails.profile_pic);

  const searchHandler = () => {
    setLoading(true);
    const data = {phone_number: userDetails.phone_number};

    PostRequest(userToken.token, data, vendorUris.userSendOtpCode).then(res => {
      console.log('validate customer res :', res.data);

      if (res.data.is_otp_send === true) {
        Alert.alert('Otp is : ', res.data.data.code);
        navigation.navigate('VerifyOtp', {
          phoneNumber: userDetails.phone_number,
        });
        setLoading(false);
      }
    });
  };

  return (
    <View style={styles.userFoundContainer}>
      <ArrowHeader heading="User Found👋" />
      <View style={styles.userImageContainer}>
        <View style={styles.userImageView}>
          <Image
            source={
              userDetails.profile_pic
                ? {uri: userDetails.profile_pic}
                : require('../../assets/icons/userFound.png')
            }
            style={styles.userFoundImage}
          />
        </View>
        <Text style={styles.userText}>
          {userDetails.name ? userDetails.name : 'Jones King'}
        </Text>
      </View>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userDetails}>
          <Image
            source={require('../../assets/icons/userId.png')}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsText}>
            User ID:{' '}
            <Text style={styles.boldText}>
              {' '}
              {userDetails.id ? userDetails.id : 'U441256'}
            </Text>
          </Text>
        </View>
        <View style={styles.userDetails}>
          <MaterialIcons name="location-pin" size={15} color="#000" />
          <Text style={styles.userDetailsText}>
            Address:
            <Text style={styles.boldText}>
              {' '}
              {userDetails.address ? userDetails.address : '--'}
            </Text>
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Image
            source={require('../../assets/icons/subscription.png')}
            style={styles.userDetailsIcon}
          />
          <Text style={styles.userDetailsText}>Subscription:</Text>
          <Text style={styles.subscription}>
            {' '}
            {userDetails.subscription_status
              ? userDetails.subscription_status
              : 'Active'}
          </Text>
        </View>
        <Pressable style={styles.sendSMS} onPress={() => searchHandler()}>
          <Text style={styles.sendSMSText}>Send SMS OTP</Text>
        </Pressable>
        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.yellow} />
        </View>
      </View>
    </View>
  );
};
