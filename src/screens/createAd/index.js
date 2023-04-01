import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {globalInputsStyles} from '@utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BottomBar, TopHeader} from '@components';
import {MyTheme} from '@utils';
import { ArrowHeader } from '../../components';

export const CreateAd = ({navigation}) => {
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [promotionDetails, setPromotionDetails] = useState('');
  const [promotionDuration, setPromotionDuration] = useState('');

  const createHandler = () => {};

  return (
    <View style={styles.signupContainer}>
     <ArrowHeader heading="Create Ad" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search (Vendor, Offers)"
          placeholderTextColor={MyTheme.EerieBlack}
        />
        <Pressable style={styles.searchPress}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.searchImage}
          />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Company name* </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCompany}
            value={company}
            placeholder="Good Health Pharmacy"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Category </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCategory}
            value={category}
            placeholder="Health & Wellness"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Original price*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setOriginalPrice}
            value={originalPrice}
            placeholder="150$"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Discounted price*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setDiscountedPrice}
            value={discountedPrice}
            placeholder="70$"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Promotion details</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setPromotionDetails}
            value={promotionDetails}
            placeholder="Philips Iron - Promo"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>
            Promotion Duration{' '}
          </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setPromotionDuration}
            value={promotionDuration}
            placeholder="15 hours"
          />
        </View>
        <Pressable style={styles.register} onPress={() => createHandler()}>
          <Text style={styles.registerText}>Create</Text>
        </Pressable>
        {/* <View style={styles.emptyView}></View> */}
      </ScrollView>
    </View>
  );
};
