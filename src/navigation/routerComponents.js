// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LogInScreen,
  LoginOtp,
  Dashboard,
  AccountScreen,
  Notifications,
  ValidateCustomer,
  UserFound,
  VerifyOtp,
  MyAds,
  CreateAd,
  RecordSale,
  OrdersHistory,
  RecoverPassword,
  ResetPassword,
  AccountDetails,
  UpdatePassword,
  PromoDetails,
} from '@screens';
import {TopHeader} from '@components';
import {useSelector} from 'react-redux';
import {token} from '@redux/tokenSlice';
import { MyTheme } from '../utils';

const Stack = createNativeStackNavigator();

export const RouterComponents = () => {
  const userToken = useSelector(token);
  console.log('userToken :', userToken);

  return (
    <NavigationContainer>
      {userToken.token === '' ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarColor: MyTheme.backgroundColor,
            statusBarStyle: 'dark',
          }}>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="LoginOtp" component={LoginOtp} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarColor: MyTheme.backgroundColor,
            statusBarStyle: 'dark',
          }}>
          <Stack.Screen name="Dashboard" component={Dashboard} 
            options={{statusBarColor:MyTheme.primary,statusBarStyle:"dark"}}/>
          <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{statusBarHidden: true}}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="TopHeader" component={TopHeader} />
          <Stack.Screen name="ValidateCustomer" component={ValidateCustomer} />
          <Stack.Screen name="UserFound" component={UserFound} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          <Stack.Screen name="MyAds" component={MyAds} />
          <Stack.Screen name="CreateAd" component={CreateAd} />
          <Stack.Screen name="RecordSale" component={RecordSale} />
          <Stack.Screen name="OrdersHistory" component={OrdersHistory} />
          <Stack.Screen name="AccountDetails" component={AccountDetails} />
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          <Stack.Screen name="PromoDetails" component={PromoDetails} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
