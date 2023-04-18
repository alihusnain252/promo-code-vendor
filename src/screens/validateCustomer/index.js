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
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';
import {PostRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {MyTheme, vendorUris} from '../../utils';

export const ValidateCustomer = ({navigation}) => {
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
          PostRequest(userToken.token, data, vendorUris.userVerifyUser).then(
            res => {
              console.log('validate customer res :', res.data);
              if (res.data.message === 'User not found') {
                setNoDisplay(true);
                setLoading(false);
                setErrorText(res.data.message);
              } else {
                setNoDisplay(false);
                setLoading(false);
                setPhoneNumber('');
                navigation.navigate('UserFound', {userDetails: res.data.data});
              }
            },
          );
        }
      }
    }
  };

  return (
    <View style={styles.validateContainer}>
      <ArrowHeader heading="Validate Customer" />
      <View style={styles.body}>
        {/* <Text style={styles.validateText}>Validate Customer</Text> */}
        <Text style={styles.phoneText}>Customer Phone #</Text>
        <TextInput
          style={noDisplay === false ? globalInputsStyles.input : styles.input}
          placeholder="Phone Number"
          placeholderTextColor={MyTheme.grey100}
          value={phoneNumber}
          onChangeText={value => setPhoneNumber(value)}
          keyboardType="numeric"
          maxLength={10}
        />
        <View style={noDisplay === false ? styles.noDisplay : styles.notFound}>
          <Image
            source={require('../../assets/icons/notFound.png')}
            style={styles.notFoundImage}
          />
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
