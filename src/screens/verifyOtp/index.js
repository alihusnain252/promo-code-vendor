import {View, Text, Pressable, Modal, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BottomBar, TopHeader} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {OtpContainer} from '@components';
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';
import { useSelector } from 'react-redux';
import { token } from '../../redux/tokenSlice';
import { PostRequest } from '../../api/apiCall';

export const VerifyOtp = ({ route , navigation}) => {
  const {phoneNumber}=route.params;

  const [otp, setOtp] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const userToken = useSelector(token)




  
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const verifyHandler = () => {
    console.log(otp);
    const data = {phone_number: phoneNumber,
      otp_code:otp
    }

    PostRequest(userToken.token,data,"api/vendor/verify-otpcode").then(res=>{
      console.log("validate customer res :",res.data);

      if (res.data.success === true) {
        setModalVisible(true)
      }
      
    })
  };

  const okPressHandler = ()=>{
    setModalVisible(false);
    navigation.navigate("ValidateCustomer")
  }

  return (
    <View style={styles.verifyOtpContainer}>
      <ArrowHeader heading="Verify otp" />
      <OtpContainer setText={setOtp} />

      {/* <Text style={globalInputsStyles.resend}>Resend code in 00:32</Text> */}
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.successContainer}>
                <Image
                  source={require('../../assets/images/success.png')}
                  style={styles.successImage}
                />
                <Text style={styles.successText}>Successful !!!</Text>
                <Text style={styles.successMessage}>
                  Customer verified Successfully !
                </Text>
                <Pressable
                  style={styles.okPres}
                  onPress={() => okPressHandler()}>
                  <Text style={styles.okPresText}>ok</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
