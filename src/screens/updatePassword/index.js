import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {vendorUris, globalInputsStyles} from '@utils';
import {ArrowHeader} from '@components';
import {PostRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '@redux/tokenSlice';
import {MyTheme} from '../../utils';

export const UpdatePassword = ({navigation}) => {
  const userToken = useSelector(token);

  const [newPassword, setNewPassword] = useState('');
  const [conformNewPassword, setConformNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const updatePasswordHandle = () => {
    setLoading(true);
    let data = {
      'current-password': currentPassword,
      'new-password': newPassword,
      'new-password-confirm': conformNewPassword,
    };
    PostRequest(userToken.token, data, vendorUris.updatePassword).then(
      response => {
        console.log('api response :', response);
        // Alert.alert(response.data.message)
        if (response.data.success) {
          Alert.alert('', response.data.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
          setLoading(false);
        } else {
          Alert.alert('Alert', response.data.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      },
    );
  };

  return (
    <View style={styles.updatePasswordContainer}>
      <ArrowHeader heading="Update Password" />
      <ScrollView style={styles.scrollView}>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Current Password*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCurrentPassword}
            value={currentPassword}
            placeholder="Current Password"
            placeholderTextColor={MyTheme.grey100}
            secureTextEntry={true}
          />
        </View>
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
        <Pressable style={styles.update} onPress={() => updatePasswordHandle()}>
          <Text style={styles.updateText}>Update</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
