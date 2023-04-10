import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalInputsStyles} from '@utils';
import {OtpContainer} from '../../components';
import {useDispatch} from 'react-redux';
import {updateToken} from '@redux/tokenSlice';
import { PostRequestWithoutToken } from '../../api/apiCall';
import { vendorUris } from '../../utils';

export const LoginOtp = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');

  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const verifyHandler = () => {
    setLoading(true);
    const data = {phone_number: phoneNumber, otp_code: otp};

    PostRequestWithoutToken( data, vendorUris.verifyOtp).then(res => {
      console.log('validate customer res :', res);

      // if (res.data.success === true) {
      //   setModalVisible(true);
      //   setLoading(false);
      // }
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

      <Pressable style={styles.conform} onPress={() => verifyHandler()}>
        <Text style={styles.conformText}>Conform</Text>
      </Pressable>
    </View>
  );
};
