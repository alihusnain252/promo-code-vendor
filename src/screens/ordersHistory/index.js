import {View, Text, Pressable, TextInput, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {ArrowHeader} from '../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const OrdersHistory = () => {
  const [filterDisplay, setFilterDisplay] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      orderIndex: '1',
      orderCustomerId: '04453453451',
      orderTime: '5/6/22 . 12:49 AM',
      orderPrice: '329.00',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      orderIndex: '2',
      orderCustomerId: '12445342534',
      orderTime: '9/6/22 . 02:00 AM',
      orderPrice: '229.00',
    },
    {
      id: '11194a0f-3da1-471f-bd96-145571e29d72',
      orderIndex: '3',
      orderCustomerId: '733534533451',
      orderTime: '12/7/22 . 4:40 AM',
      orderPrice: '124.00',
    },
    {
      id: '67594a0f-3da1-471f-bd96-145571e29d72',
      orderIndex: '4',
      orderCustomerId: '432534533451',
      orderTime: '23/9/22 . 5:50 PM',
      orderPrice: '420.00',
    },
    {
      id: '43294a0f-3da1-471f-bd96-145571e29d72',
      orderIndex: '5',
      orderCustomerId: '111134533451',
      orderTime: '12/10/22 . 4:30 AM',
      orderPrice: '1421.00',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      orderIndex: '6',
      orderCustomerId: '321253453321',
      orderTime: '01/4/23 . 12:00 PM',
      orderPrice: '124.00',
    },
  ];

  const Item = ({orderIndex, orderCustomerId, orderTime, orderPrice}) => (
    <View style={styles.item}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderIndex}>#{orderIndex}</Text>
        <Text style={styles.orderCustomerId}>
          Customer # : {orderCustomerId}
        </Text>
        <Text style={styles.orderTime}>Time : {orderTime}</Text>
      </View>
      <View style={styles.orderPriceView}>
        <Text style={styles.orderPrice}>GHS{orderPrice}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.ordersHistoryContainer}>
      <ArrowHeader heading="Order History" />
      <View style={filterDisplay === false ? styles.top : styles.noDisplay}>
        <Pressable
          style={styles.filterPress}
          onPress={() => setFilterDisplay(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>
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
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item
              orderIndex={item.orderIndex}
              orderCustomerId={item.orderCustomerId}
              orderPrice={item.orderPrice}
              orderTime={item.orderTime}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.downloadBtn}>
        <Pressable style={styles.downloadPress}>
          <Ionicons name="download-outline" size={22} color="#FFF" />
          <Text style={styles.downloadText}>Download in Pdf</Text>
        </Pressable>
        <Pressable style={styles.downloadPress}>
          <Ionicons name="download-outline" size={22} color="#FFF" />
          <Text style={styles.downloadText}>Download in XLSX</Text>
        </Pressable>
      </View>
    </View>
  );
};
