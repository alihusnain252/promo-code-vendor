import {View, Text, Pressable, TextInput, ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalInputsStyles} from '@utils';
import {OtpContainer} from '../../components';
import {useDispatch} from 'react-redux';
import {updateToken} from '@redux/tokenSlice';
import {PostRequestWithoutToken} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';

export const LoginOtp = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');

  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const verifyHandler = () => {
    setLoading(true);
    const data = {phone_number: phoneNumber, otp_code: otp};

    PostRequestWithoutToken(data, vendorUris.verifyOtp).then(res => {
      console.log('validate customer res :', res);

      if (res.status) {
        Alert.alert('', res.data.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate("ResetPassword",{phoneNumber:phoneNumber})},
        ]);
        setLoading(false);
        
      } else {
        console.log(res);
        Alert.alert(JSON.stringify(res.error))
        setLoading(false);
      }
    });
  };

  const okPressHandler = () => {
    setModalVisible(false);

    navigation.navigate('ValidateCustomer');
  };

  const loginHandler = () => {
    dispatch(updateToken('1234'));
  };

  return (
    <View style={styles.otpContainer}>
      <View style={styles.otpHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#000" />
        </Pressable>
        <Text style={styles.otpHeaderText}>Verification Code</Text>
      </View>
      <View style={styles.otpView}>
        <OtpContainer setText={setOtp} />
      </View>
      <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
        <ActivityIndicator size={36} color={MyTheme.primary} />
      </View>

      <Pressable style={styles.conform} onPress={() => verifyHandler()}>
        <Text style={styles.conformText}>Conform</Text>
      </Pressable>
    </View>
  );
};
