import {
  View,
  Text,
  Pressable,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {BottomBar, TopHeader} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {OtpContainer} from '@components';
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {PostRequest, PostRequestWithoutToken} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';

export const VerifyOtp = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  console.log('userPhone Number :' + phoneNumber);

  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userToken = useSelector(token);
  const [loading, setLoading] = useState(false);

  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const verifyHandler = () => {
    setLoading(true);
    const data = {phone_number: phoneNumber, otp_code: otp};

    PostRequest(userToken.token, data, vendorUris.userVerifyUser).then(res => {
      console.log('validate customer res :', res);

      if (res.data.success === true) {
        setModalVisible(true);
        setLoading(false);
      }
    });
  };

  const okPressHandler = () => {
    setModalVisible(false);

    navigation.navigate('ValidateCustomer');
  };

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

      <Pressable
        style={otp === '' ? styles.notVerifyOtpBtn : styles.verifyOtpBtn}
        onPress={() => verifyHandler()}>
        <Text style={styles.notVerifyOtpText}>Verify OTP</Text>
      </Pressable>

      <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
        <ActivityIndicator size={36} color={MyTheme.yellow} />
      </View>
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
