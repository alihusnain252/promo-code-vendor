import { View, Text, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalInputsStyles } from '@utils';
import { OtpContainer } from '../../components';
import { useDispatch } from 'react-redux';
import { updateToken } from '@redux/tokenSlice';

export const LoginOtp = ({ navigation }) => {


  const dispatch =useDispatch()

  


  const loginHandler = () => {
    dispatch(updateToken("1234"))
  }


  return (
    <View style={styles.otpContainer}>
      <View style={styles.otpHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#000" />
        </Pressable>
        <Text style={styles.otpHeaderText}>Verification Code</Text>
      </View>
      <View style={styles.otpView}>
      <OtpContainer />
      </View>
      <Text style={globalInputsStyles.resend}>Resend code in 00:32</Text>


      <Pressable style={styles.conform} onPress={() => loginHandler()}>
        <Text style={styles.conformText}>Conform</Text>
      </Pressable>
    </View>
  );
};
