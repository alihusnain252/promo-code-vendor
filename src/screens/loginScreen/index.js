import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {signInInputsStyles} from '@utils';
import {LoginPostRequest} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../redux/tokenSlice';

export const LogInScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginHandler = () => {
    let s = phoneNumber.toString();

    let num = phoneNumber.replace('.', '');
    setLoading(true);
    const data = {
      phone_number: phoneNumber,
      password: password,
    };
    phoneNumber === ''
      ? Alert.alert('', 'Please add phone number', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setLoading(false)},
        ])
      : password === ''
      ? Alert.alert('', 'Please add password', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setLoading(false)},
        ])
      : parseInt(s.charAt(0)) !== 0
      ? Alert.alert('', 'First digit must be 0 in Phone number', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setLoading(false)},
        ])
      : isNaN(num)
      ? Alert.alert('', 'please add Numbers in Phon NUmber', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setLoading(false)},
        ])
      : LoginPostRequest(data, vendorUris.login).then(response => {
          console.log('api response :', response.data);
          setLoading(false);
          if (response.data.data.length === 0) {
            Alert.alert('', response.data.message, [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => setLoading(false)},
            ]);
          } else {
            dispatch(
              updateToken(
                response.data.data.token ? response.data.data.token : '',
              ),
            );
            setLoading(false);
          }
        });
  };
  const recoverHandler = () => {
    navigation.navigate('RecoverPassword');
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Login✨</Text>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>
      <View style={styles.loginInputs}>
        <View style={signInInputsStyles.inputView}>
          <Image
            source={require('../../assets/icons/fullName.png')}
            style={signInInputsStyles.imgStyle1}
          />
          <TextInput
            style={signInInputsStyles.input}
            onChangeText={e => setPhoneNumber(e)}
            value={phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={MyTheme.grey100}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>
        <View style={signInInputsStyles.inputView}>
          <Image
            source={require('../../assets/icons/lock.png')}
            style={signInInputsStyles.imgStyle2}
          />
          <TextInput
            style={signInInputsStyles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
      </View>
      <View style={styles.loginBtns}>
        <Pressable
          style={styles.recoverPassword}
          onPress={() => recoverHandler()}>
          <Text style={styles.recoverText}>Recover Password</Text>
        </Pressable>
        <Pressable style={styles.login} onPress={() => loginHandler()}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.primary} />
        </View>
      </View>
    </View>
  );
};
