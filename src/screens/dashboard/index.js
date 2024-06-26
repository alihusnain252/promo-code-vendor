import { View, Text, TextInput, Image, Pressable } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { BottomBar, TopHeader } from '@components';
import { MyTheme } from '@utils';

export const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.dashboardContainer}>
      <TopHeader />
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search (Vendor, Offers)"
          placeholderTextColor={MyTheme.EerieBlack}
          editable={false}
        />
        <Pressable style={styles.searchPress}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.searchImage}
          />
        </Pressable>
      </View> */}
      <View style={styles.topPress}>
        <Pressable
          style={styles.validateCustomer}
          onPress={() => navigation.navigate('ValidateCustomer')}>
          <Image
            source={require('../../assets/icons/validateCustomer.png')}
            style={styles.images}
          />
          <Text style={styles.validationText}>Validate Customer</Text>
        </Pressable>
        <Pressable
          style={styles.validateCustomer}
          onPress={() => navigation.navigate('RecordSale')}>
          <Image
            source={require('../../assets/icons/cart.png')}
            style={[styles.images, { padding: 20 }]}
          />
          <Text style={styles.validationText}>Record Sale</Text>
        </Pressable>
        {/* <Pressable style={styles.recordSale}></Pressable> */}
      </View>
      <Pressable
        style={styles.history}
        onPress={() => navigation.navigate('OrdersHistory')}>
        <Image
          source={require('../../assets/icons/history.png')}
          style={styles.historyImages}
        />
      </Pressable>
      <BottomBar />
    </View>
  );
};
