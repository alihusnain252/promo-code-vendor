import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
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
import {vendorUris} from '../../utils';

export const CreateAd = ({route, navigation}) => {
  const {adDetails, update} = route.params;
  // console.log('adDetails :' + adDetails + ' update :' + update);

  const [company, setCompany] = useState(update ? adDetails.company_name : '');
  const [category, setCategory] = useState(
    update ? JSON.stringify(adDetails.category_id) : '',
  );
  const [originalPrice, setOriginalPrice] = useState(
    update ? adDetails.original_price : '',
  );
  const [discountedPrice, setDiscountedPrice] = useState(
    update ? adDetails.discounted_price : '',
  );
  const [promotionDetails, setPromotionDetails] = useState(
    update ? adDetails.promotion_details : '',
  );
  const [promotionDuration, setPromotionDuration] = useState(
    update ? adDetails.promotion_duration : '',
  );
  const [loading, setLoading] = useState(false);
  const [adImage, setAdImage] = useState(update ? adDetails.image : '');
  const [adImageName, setAdImageName] = useState(update ? adDetails.image : '');
  const [description, setDescription] = useState(
    update ? adDetails.description : '',
  );
  const userToken = useSelector(token);

  const pickImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
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
    let data = new FormData();
    data.append('company_name', company);
    data.append('category_id', category);
    data.append('original_price', originalPrice);
    data.append('discounted_price', discountedPrice);
    data.append('promotion_details', promotionDetails);
    data.append('promotion_duration', promotionDuration);
    data.append('image', {
      uri: adImage,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });
    data.append('status', 'active');
    data.append('is_featured', '1');
    data.append('description', description);

    setLoading(true);

    if (adImage == '') {
      Alert.alert('Image is required');
      setLoading(false);
    } else {
      CreateAdRequest(
        userToken.token,
        data,
        update
          ? vendorUris.promotionUpdate + `${adDetails.id}`
          : vendorUris.promotionCreate,
      ).then(response => {
        if (response.status) {
          Alert.alert('', response.data.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
          setLoading(false);
          console.log('api response :', response);
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
          console.log('api response :', response);
        }
      });
    }
  };

  return (
    <View style={styles.signupContainer}>
      <ArrowHeader heading="Create Ad" />

      <View style={loading === false ? {display: 'none'} : styles.loader}>
        <ActivityIndicator size={36} color={MyTheme.yellow} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Company name* </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCompany}
            value={company}
            placeholder="Company Name"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Ad Image </Text>
          <Pressable
            style={globalInputsStyles.input}
            onPress={() => pickImage()}>
            <Text
              style={
                adImageName != '' ? styles.pickImage : styles.notPickImage
              }>
              {adImageName != '' ? adImageName : `Pick Ad Image`}
            </Text>

            <EvilIcons name="image" size={25} color="#000" />
          </Pressable>
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Category Id </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCategory}
            value={category}
            placeholder="Category Id"
            placeholderTextColor={MyTheme.grey100}
            keyboardType="number-pad"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Original price*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setOriginalPrice}
            value={originalPrice}
            placeholder="Original Price"
            placeholderTextColor={MyTheme.grey100}
            keyboardType="number-pad"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Discounted price*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setDiscountedPrice}
            value={discountedPrice}
            placeholder="Discounted Price"
            placeholderTextColor={MyTheme.grey100}
            keyboardType="number-pad"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Promotion details</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setPromotionDetails}
            value={promotionDetails}
            placeholder="Promotion Details"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>
            Promotion Duration (Hours)
          </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setPromotionDuration}
            value={promotionDuration}
            placeholder="Promotion Duration"
            placeholderTextColor={MyTheme.grey100}
            keyboardType="number-pad"
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Description </Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <Pressable style={styles.register} onPress={() => createHandler()}>
          <Text style={styles.registerText}>Create</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
