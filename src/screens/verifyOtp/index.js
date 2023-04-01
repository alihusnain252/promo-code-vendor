import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BottomBar, TopHeader} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {OtpContainer} from '@components';
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';

export const VerifyOtp = ({navigation}) => {
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const verifyHandler = () => {
    navigation.navigate('MyAds');
  };

  return (
    <View style={styles.verifyOtpContainer}>
      <ArrowHeader heading="Verify otp" />
      <OtpContainer />

      <Text style={globalInputsStyles.resend}>Resend code in 00:32</Text>
      {/* <View style={styles.notFoundView}>
      <View style={noDisplay === false ? styles.noDisplay : styles.notFound}>
          <Image
            source={require('../../assets/icons/notFound.png')}
            style={styles.notFoundImage}
          />
          <Text style={styles.notFoundText}>{errorText}</Text>

        </View>
      </View> */}

      <Pressable style={styles.notVerifyOtpBtn} onPress={() => verifyHandler()}>
        <Text style={styles.notVerifyOtpText}>Verify OTP</Text>
      </Pressable>
    </View>
  );
};
