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
import {MyTheme} from '@utils';
import {ArrowHeader} from '../../components';
import {CreateAdRequest} from '../../api/apiCall';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const CreateAd = ({navigation}) => {
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [promotionDetails, setPromotionDetails] = useState('');
  const [promotionDuration, setPromotionDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [adImage, setAdImage] = useState('');
  const [adImageName, setAdImageName] = useState('');
  const userToken = useSelector(token);

  let options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const pickImage = () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0];
        console.log('selected Image :', source.uri);
        setAdImage(source.uri);
        setAdImageName(source.fileName);
      }
    });
  };

  const createHandler = () => {
    const data = new FormData();
    data.append('company_name', 'Good health pharmany');
    data.append('category_id', '1');
    data.append('original_price', '150');
    data.append('discounted_price', '70');
    data.append('promotion_details', 'Philips - iron promo');
    data.append('promotion_duration', '20');
    data.append('image', {
      uri: adImage,
      type: 'image/jpeg',
      name: 'userPhoto', //Math.random()
    });
    data.append('status', 'active');
    data.append('is_featured', '1');
    data.append('description', 'Philips - iron promo');
    setLoading(true);
    CreateAdRequest(
      userToken,
      data,
      (url = 'api/vendor/promotion/create'),
    ).then(response => {
      setLoading(false);
      console.log('api response :', response.data);
      // dispatch(
      //   updateToken(response.data.data.token ? response.data.data.token : "")
      // );
    });
  };

  return (
    <View style={styles.signupContainer}>
      <ArrowHeader heading="Create Ad" />

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
          <Text style={globalInputsStyles.globalLabel}>Ad Image </Text>
          <Pressable
            style={globalInputsStyles.input}
            onPress={() => pickImage()}>
            <Text
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 15,
              }}>
              {adImageName != '' ? adImageName : `Pick Ad Image`}
            </Text>

          <EvilIcons name="image" size={25} color="#000" />
          </Pressable>
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
        <View style={styles.emptyView}></View>
      </ScrollView>
    </View>
  );
};
