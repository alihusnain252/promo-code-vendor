import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import image from '../../assets/images/image8.png';
import {AdCard} from '../adCard';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {GetRequest} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';

export const Ads = () => {
  const [loading, setLoading] = useState(false);
  const [adsRecord, setAdsRecord] = useState([]);

  const userToken = useSelector(token);

  const AdRecord = async () => {
    setLoading(true);
    await GetRequest(`${userToken.token}`, vendorUris.promotionListing)
      .then(res => {
        console.log('with token data :', res.data.data);
        setAdsRecord(res.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log('getData Error :', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    AdRecord();
  }, []);
  const Item = ({data}) => <AdCard data={data} />;

  return (
    <View style={styles.adsContainer}>
      <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
        <ActivityIndicator size={36} color={MyTheme.yellow} />
      </View>
      <FlatList
        data={adsRecord}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      />

      {/* <ScrollView style={styles.scroll}>
       {
        adsRecord.map((ad)=>{
          return (
            <AdCard data={ad} />
          )
        })
       }
      </ScrollView> */}
    </View>
  );
};
