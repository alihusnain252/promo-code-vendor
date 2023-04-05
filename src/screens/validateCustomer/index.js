import {View, Text, TextInput, Pressable, Image, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {TopHeader, BottomBar} from '@components';
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';
import {PostRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import { MyTheme } from '../../utils';

export const ValidateCustomer = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const userToken = useSelector(token);

  const searchHandler = () => {
    setLoading(true)
    const data = {phone_number: phoneNumber};

    if (phoneNumber === '') {
      setNoDisplay(true);
      setLoading(false)
      setErrorText('please Add Phone Number');
    } else {
      PostRequest(userToken.token, data, 'api/vendor/verify-user').then(res => {
        console.log('validate customer res :', res.data);
        if (res.data.message === 'User not found') {
          setNoDisplay(true);
          setLoading(false)
          setErrorText(res.data.message);
        } else {
          setNoDisplay(false);
          setLoading(false)
          navigation.navigate('UserFound', {userDetails: res.data.data});
        }
      });
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
          placeholder="0212345678"
          value={phoneNumber}
          onChangeText={e => setPhoneNumber(e)}
          keyboardType="numeric"
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
