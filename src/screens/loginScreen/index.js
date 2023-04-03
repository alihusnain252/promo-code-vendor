import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {signInInputsStyles} from '@utils';
import {LoginPostRequest} from '../../api/apiCall';
import {MyTheme} from '../../utils';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../redux/tokenSlice';

export const LogInScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginHandler = () => {
    const data = {
      phone_number: phoneNumber,
      password: password,
    };
    setLoading(true);
    LoginPostRequest(data, (url = 'api/vendor/login')).then(response => {
      setLoading(false);
      console.log('api response :', response.data);
      dispatch(
        updateToken(response.data.data.token ? response.data.data.token : "")
      );
    });

    // navigation.navigate('LoginOtp');
  };
  const recoverHandler = () => {};

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
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number / UserID"
            keyboardType="numeric"
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
          <ActivityIndicator size={36} color={MyTheme.yellow} />
        </View>
      </View>
    </View>
  );
};
