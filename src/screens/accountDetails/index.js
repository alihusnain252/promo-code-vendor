import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {globalInputsStyles} from '@utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {updateImageRequest} from '../../api/apiCall';
import {ArrowHeader} from '@components';
import ProfileImage from '../../assets/icons/profile.png';
import {useSelector} from 'react-redux';
import {token} from '@redux/tokenSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {MyTheme, vendorUris} from '../../utils';

export const AccountDetails = ({route, navigation}) => {
  const {profileDetails} = route.params;

  const userToken = useSelector(token);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imageUri, setImageUri] = useState(
    profileDetails ? profileDetails.profile_pic : ProfileImage,
  );
  const [image_one, setImage_one] = useState(
    profileDetails ? profileDetails.image_one : ProfileImage,
  );
  const [image_two, setImage_two] = useState(
    profileDetails ? profileDetails.image_two : ProfileImage,
  );
  const [image_three, setImage_three] = useState(
    profileDetails ? profileDetails.image_three : ProfileImage,
  );
  const [image_four, setImage_four] = useState(
    profileDetails ? profileDetails.image_four : ProfileImage,
  );
  const [firstName, setFirstName] = useState(
    profileDetails ? profileDetails.first_name : '',
  );
  const [lastName, setLastName] = useState(
    profileDetails ? profileDetails.last_name : '',
  );
  const [dob, setDob] = useState(
    profileDetails ? profileDetails.date_of_birth : '',
  );
  const [nationality, setNationality] = useState(
    profileDetails ? profileDetails.nationality : '',
  );
  const [email, setEmail] = useState(
    profileDetails ? profileDetails.email : '',
  );
  const [occupation, setOccupation] = useState(
    profileDetails ? profileDetails.occupation : '',
  );
  const [instituteName, setInstituteName] = useState(
    profileDetails ? profileDetails.institution_name : '',
  );
  const [countryAddress, setCountryAddress] = useState(
    profileDetails ? profileDetails.country : '',
  );
  const [addressLine1, setAddressLine1] = useState(
    profileDetails ? profileDetails.address : '',
  );
  const [addressLine2, setAddressLine2] = useState(
    profileDetails ? profileDetails.address_two : '',
  );
  const [regionCapital, setRegionCapital] = useState(
    profileDetails ? profileDetails.region_capital : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    profileDetails ? profileDetails.phone_number : '',
  );

  const updateProfileImage = (sImageUri, image1 , image2 , image3,image4) => {
    console.log("image1 :" + image1 + "   pImage : " + sImageUri);

    let data = new FormData();
    data.append('image', {
      uri: sImageUri,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });
    data.append('image_one', {
      uri: image1,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });
    data.append('image_two', {
      uri: image2,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });
    data.append('image_three', {
      uri: image3,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });
    data.append('image_four', {
      uri: image4,
      type: 'image/jpeg',
      name: 'adPhoto.png',
    });

    setLoading(true);

    updateImageRequest(
      userToken.token,
      data,
      vendorUris.updateProfileImage,
    ).then(response => {
      console.log('api response :', response);
      if (response.data?.success ) {
        Alert.alert(response.data.message);
        setLoading(false);
      } else {
        Alert.alert(response.data.error);
        setLoading(false);
      }
    });
  };

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
        setImageUri(source.uri);
        const sImageUri = source.uri;
        updateProfileImage(sImageUri , image_one , image_two , image_three , image_four);
        // setAdImageName(source.fileName);
      }
    });
  };
  const pickImage1 = () => {
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
        setImage_one(source.uri);
        const image1 = source.uri;
        updateProfileImage( imageUri, image1);
        // setAdImageName(source.fileName);
      }
    });
  };
  const pickImage2 = () => {
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
        setImage_two(source.uri);
        const image2 = source.uri;
        updateProfileImage( imageUri , image_one ,image2,image_three , image_four);
        // setAdImageName(source.fileName);
      }
    });
  };
  const pickImage3 = () => {
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
        setImage_three(source.uri);
        const image3 = source.uri;
        updateProfileImage(image3);
        // setAdImageName(source.fileName);
      }
    });
  };
  const pickImage4 = () => {
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
        setImage_four(source.uri);
        const image4 = source.uri;
        updateProfileImage(image4);
        // setAdImageName(source.fileName);
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setDob(x1[2] + '/' + x1[1] + '/' + x1[0]);
    hideDatePicker();
  };
  const numberValidations = value => {
    let s = value.toString();
    if (parseInt(s.charAt(0)) !== 0) {
      // Alert.alert('First number must be 0')
    } else {
      let num = value.replace('.', '');
      if (isNaN(num)) {
        // Alert.alert("please add Numbers")
      } else {
        setPhoneNumber(num);
      }
    }
  };

  const onPressUpdate = () => {
    // updateProfileImage();
  };

  return (
    <View style={styles.signupContainer}>
      <ArrowHeader heading="Account Details" />
      <Pressable style={styles.profileImageView} onPress={() => pickImage()}>
        <Image
          source={imageUri ? {uri: imageUri} : ProfileImage}
          style={styles.profileImage}
        />
      </Pressable>
      <View style={styles.imagesContainer}>
        <Pressable style={styles.profileImageView} onPress={() => pickImage1()}>
          <Image
            source={image_one ? {uri: image_one} : ProfileImage}
            style={styles.profileImage}
          />
        </Pressable>
        <Pressable style={styles.profileImageView} onPress={() => pickImage2()}>
          <Image
            source={image_two ? {uri: image_two} : ProfileImage}
            style={styles.profileImage}
          />
        </Pressable>
        <Pressable style={styles.profileImageView} onPress={() => pickImage3()}>
          <Image
            source={image_three ? {uri: image_three} : ProfileImage}
            style={styles.profileImage}
          />
        </Pressable>
        <Pressable style={styles.profileImageView} onPress={() => pickImage4()}>
          <Image
            source={image_four ? {uri: image_four} : ProfileImage}
            style={styles.profileImage}
          />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>First name*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Last name*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Date of birth*</Text>
          <Pressable
            onPress={() => {
              showDatePicker();
            }}>
            <View style={globalInputsStyles.input}>
              <TextInput
                style={styles.dateInput}
                onChangeText={setDob}
                value={dob}
                placeholder="Date of birth"
                placeholderTextColor={MyTheme.grey100}
                editable={false}
              />
              <Pressable
                style={styles.datePress}
                onPress={() => {
                  showDatePicker();
                }}>
                <EvilIcons name="calendar" size={30} color="#000" />
              </Pressable>
            </View>
          </Pressable>
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Nationality*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setNationality}
            value={nationality}
            placeholder="Nationality"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>email*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={MyTheme.grey100}
            editable={false}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Phone Number*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={value => numberValidations(value)}
            value={phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={MyTheme.grey100}
            editable={false}
            maxLength={10}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>occupation*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setOccupation}
            value={occupation}
            placeholder="Occupation"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Institution Name*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setInstituteName}
            value={instituteName}
            placeholder="Institution name here"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Country Address*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setCountryAddress}
            value={countryAddress}
            placeholder="Country"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Address Line 1*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setAddressLine1}
            value={addressLine1}
            placeholder="Address Line"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Address Line 2*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setAddressLine2}
            value={addressLine2}
            placeholder="Address Line 2"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <View style={[globalInputsStyles.globalInputs, {alignSelf: 'center'}]}>
          <Text style={globalInputsStyles.globalLabel}>Region Capital*</Text>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setRegionCapital}
            value={regionCapital}
            placeholder=" Capital"
            placeholderTextColor={MyTheme.grey100}
          />
        </View>
        <Pressable style={styles.register} onPress={() => onPressUpdate()}>
          <Text style={styles.registerText}>Update</Text>
        </Pressable>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
