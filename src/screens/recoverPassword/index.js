import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {TopHeader, BottomBar} from '@components';
import {ArrowHeader} from '../../components';
import {PostRequest, PostRequestWithoutToken} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {MyTheme, vendorUris, globalInputsStyles} from '@utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const RecoverPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const userToken = useSelector(token);

  const searchHandler = () => {
    let s = phoneNumber.toString();
    let num = phoneNumber.replace('.', '');
    setLoading(true);
    const data = {phone_number: phoneNumber};
    // navigation.navigate("ResetPassword",{phoneNumber:phoneNumber})

    if (phoneNumber === '') {
      setNoDisplay(true);
      setLoading(false);
      setErrorText('please Add Phone Number');
    } else {
      if (parseInt(s.charAt(0)) !== 0) {
        setNoDisplay(true);
        setLoading(false);
        setErrorText('Phone Number must start with 0');
      } else {
        if (isNaN(num)) {
          setNoDisplay(true);
          setLoading(false);
          setErrorText('Phone Number must be digits');
        } else {
          PostRequestWithoutToken(data, vendorUris.forgotPasswordRequest).then(
            res => {
              if (res.status) {
                console.log('validate customer res :', res.data.data);
                Alert.alert('otp :', res.data.data.code);
                setNoDisplay(false);
                setLoading(false);
                navigation.navigate('LoginOtp', {
                  phoneNumber: res.data.data.phone_number,
                  forgot: true,
                });
              } else {
                setNoDisplay(true);
                setLoading(false);
                setErrorText(res.data.message);
              }
            },
          );
        }
      }
    }
  };
  return (
    <View style={styles.validateContainer}>
      <ArrowHeader heading="Forgot Password" />
      <View style={styles.body}>
        {/* <Text style={styles.validateText}>Validate Customer</Text> */}
        <Text style={styles.phoneText}>Phone Number #</Text>
        <TextInput
          style={noDisplay === false ? globalInputsStyles.input : styles.input}
          placeholder="Phone Number"
          placeholderTextColor={MyTheme.grey100}
          value={phoneNumber}
          onChangeText={e => setPhoneNumber(e)}
          keyboardType="numeric"
          maxLength={10}
        />
        <View style={noDisplay === false ? styles.noDisplay : styles.notFound}>
          <MaterialIcons name="error-outline" size={25} color="red" />
          <Text style={styles.notFoundText}>{errorText}</Text>
        </View>
        <Pressable style={styles.search} onPress={() => searchHandler()}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>

        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.yellow} />
        </View>
      </View>
    </View>
  );
};
