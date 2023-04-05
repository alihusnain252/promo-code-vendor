import {View, Text, TextInput, Pressable, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {TopHeader, BottomBar} from '@components';
import {globalInputsStyles} from '@utils';
import {ArrowHeader} from '../../components';
import {PostRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';

export const ValidateCustomer = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');
  const userToken = useSelector(token);

  const searchHandler = () => {
    const data = {phone_number: phoneNumber};

    if (phoneNumber === '') {
      setNoDisplay(true);
      setErrorText('please Add Phone Number');
    } else {
      PostRequest(userToken.token, data, 'api/vendor/verify-user').then(res => {
        console.log('validate customer res :', res.data);
        if (res.data.message === 'User not found') {
          setNoDisplay(true);
          setErrorText(res.data.message);
        } else {
          setNoDisplay(false);
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
      </View>
    </View>
  );
};
