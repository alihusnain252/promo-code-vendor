import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { BottomBar, TopHeader } from '@components'
import AntDesign from 'react-native-vector-icons/AntDesign';

export const VerifyOtp = () => {
  return (
    <View style={styles.verifyOtpContainer}>
        <TopHeader />
        <View style={styles.verifyOtpHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} color="#000" />
        </Pressable>
        <Text style={styles.verifyOtpHeaderText}>Verify otp</Text>
      </View>

      <Pressable style={styles.notVerifyOtpBtn} onPress={() => searchHandler()}>
          <Text style={styles.notVerifyOtpText}>Verify OTP</Text>
        </Pressable>
      <BottomBar />
    </View>
  )
}