import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {vendorUris, globalInputsStyles} from '@utils';
import {ArrowHeader} from '@components';
import {PostRequest, PostRequestWithoutToken} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '@redux/tokenSlice';
import {MyTheme} from '../../utils';

export const ResetPassword = ({route, navigation}) => {
  const {phoneNumber} = route.params;

  const [newPassword, setNewPassword] = useState('');
  const [conformNewPassword, setConformNewPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const resetPasswordHandle = () => {
    setLoading(true);
    let data = {
      phone_number: phoneNumber,
      password: newPassword,
      password_confirmation: conformNewPassword,
    };
    if (newPassword !== conformNewPassword) {
      Alert.alert('Password is not matched');
    } else {
      PostRequestWithoutToken(data, vendorUris.resetPassword).then(response => {
        console.log('api response :', response);
        // Alert.alert(response.data.message)
        if (response.data.success) {
          Alert.alert('', response.data.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('Login')},
          ]);
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert('Alert', response.data.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      });
    }
  };

  return (
    <View style={styles.resetPasswordContainer}>
      <ArrowHeader heading="Reset Password" />
      <ScrollView style={styles.scrollView}>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>New Password*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="New Password"
            placeholderTextColor={MyTheme.grey100}
            secureTextEntry={true}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>
            Conform New Password*
          </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setConformNewPassword}
            value={conformNewPassword}
            placeholder="Conform New Password"
            placeholderTextColor={MyTheme.grey100}
            secureTextEntry={true}
          />
        </View>
        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.primary} />
        </View>
      </ScrollView>
      <Pressable style={styles.reset} onPress={() => resetPasswordHandle()}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
};
