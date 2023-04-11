import {View, Text, TextInput, Image, Pressable, Alert} from 'react-native';
import React, { useState } from 'react';
import {styles} from './styles';
import {AdCard, ArrowHeader} from '@components';
import {MyTheme} from '@utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteAdRequest } from '../../api/apiCall';
import { useSelector } from 'react-redux';
import { token } from '../../redux/tokenSlice';
import { vendorUris } from '../../utils';

export const PromoDetails = ({route, navigation}) => {
  const {promoDetails} = route.params;
  const userToken = useSelector(token);
  console.log('promoDetails params : ', promoDetails);

  const [loading, setLoading] = useState(false)

  const venderDetails = {
    name: 'Vendor Name',
    locatedIn: 'Accra Mall',
    Address: 'Tetteh Quarshie Ave, Accra',
    ServiceOptions: 'in store , Pick up, Delivery',
  };

 const deleteAdHandler =()=>{
  setLoading(true);
  let data = "";

    deleteAdRequest(
      userToken.token,
      data,
      vendorUris.promotionDelete + `${promoDetails.id}`,
    ).then(response => {
      console.log('api response :', response);
      if (response.data.success === true) {
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
        Alert.alert('', response.error, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
        setLoading(false);
      }
    });
 }


  return (
    <View style={styles.dashboardContainer}>
      <ArrowHeader heading="Promo Details" />

      <View style={styles.imageView}>
        <Image
          source={{uri: promoDetails.image ? promoDetails.image : ''}}
          style={styles.cardImage}
        />
      </View>

      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          padding: 10,
          marginBottom: 20,
        }}>
        <Text style={styles.heading}>{promoDetails.company_name}</Text>
        <Text style={styles.description}>{promoDetails.description}</Text>
      </View>

      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={styles.headingVendor}>Name : </Text>
        <Text style={[styles.headingVendor, {color: '#E65C89'}]}>
          {promoDetails.vendor.name}
        </Text>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={styles.headingVendor}>Located In: </Text>
        <Text style={[styles.headingVendor, {color: '#E65C89'}]}>
          {venderDetails.locatedIn}
        </Text>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={styles.headingVendor}>Address: </Text>
        <Text style={[styles.headingVendor, {color: '#E65C89'}]}>
          {promoDetails.vendor.address}
        </Text>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <Text style={styles.headingVendor}>Service options: </Text>
        <Text style={[styles.headingVendor, {color: '#E65C89'}]}>
          {venderDetails.ServiceOptions}
        </Text>
      </View>

      <View style={styles.btns}>
        <Pressable style={styles.btn} onPress={()=>deleteAdHandler()}>
          <Text style={styles.btnText}>Delete</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() =>
            navigation.navigate('CreateAd', {
              adDetails: promoDetails,
              update: true,
            })
          }>
          <Text style={styles.btnText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};
