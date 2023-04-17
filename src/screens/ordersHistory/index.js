import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {ArrowHeader} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {GetRequest} from '../../api/apiCall';
import {MyTheme, vendorUris} from '../../utils';

export const OrdersHistory = () => {
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userToken = useSelector(token);

  const Item = ({id, customer_id, order_date, grand_total}) => (
    <View style={styles.item}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderIndex}>#{id}</Text>
        <Text style={styles.orderCustomerId}>Customer # : {customer_id}</Text>
        <Text style={styles.orderTime}>Time : {order_date}</Text>
      </View>
      <View style={styles.orderPriceView}>
        <Text style={styles.orderPrice}>{grand_total}</Text>
      </View>
    </View>
  );
  const getOrderHistory = () => {
    setLoading(true);
    GetRequest(userToken.token, vendorUris.orderHistory).then(res => {
      setOrderHistoryData(res.data.data.order_histories.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <View style={styles.ordersHistoryContainer}>
      <ArrowHeader heading="Order History" />
      {/* <View style={filterDisplay === false ? styles.top : styles.noDisplay}>
        <Pressable
          style={styles.filterPress}
          onPress={() => setFilterDisplay(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View> */}
      <View
        style={
          filterDisplay === false ? styles.noDisplay : styles.filterInputs
        }>
        <View style={styles.filterByView}>
          <Text style={styles.filterByText}>
            Filter by time or phone number
          </Text>
          <Pressable onPress={() => setFilterDisplay(false)}>
            <Entypo name="cross" size={22} color="#000" />
          </Pressable>
        </View>
        <View style={styles.dateInputContainer}>
          <TextInput style={styles.startDate} placeholder="Start Date" />
          <TextInput style={styles.endDate} placeholder="End Date" />
        </View>
        <View style={styles.filterByNumber}>
          <TextInput style={styles.filterNumber} placeholder="Phone Number" />
          <Pressable style={styles.searchIconPress}>
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
        <Pressable style={styles.searchPress} onPress={() => createHandler()}>
          <Text style={styles.searchPressText}>Search</Text>
        </Pressable>
      </View>
      <View
        style={
          filterDisplay === false ? styles.ordersList : styles.ordersListFilter
        }>
        <View style={loading === false ? {display: 'none'} : {marginTop: 20}}>
          <ActivityIndicator size={36} color={MyTheme.yellow} />
        </View>
        <FlatList
          data={orderHistoryData}
          renderItem={({item}) => (
            <Item
              id={item.id}
              customer_id={item.customer_id}
              grand_total={item.grand_total}
              order_date={item.order_date}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {/* <View style={styles.downloadBtn}>
        <Pressable style={styles.downloadPress}>
          <Ionicons name="download-outline" size={22} color="#FFF" />
          <Text style={styles.downloadText}>Download in Pdf</Text>
        </Pressable>
        <Pressable style={styles.downloadPress}>
          <Ionicons name="download-outline" size={22} color="#FFF" />
          <Text style={styles.downloadText}>Download in XLSX</Text>
        </Pressable>
      </View> */}
    </View>
  );
};
