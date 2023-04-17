import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { ArrowHeader } from '../../components';
import { styles } from './styles';
import { globalInputsStyles, MyTheme, vendorUris } from '../../utils';
import { useSelector } from 'react-redux';
import { token } from '../../redux/tokenSlice';
import { PostRequest } from '../../api/apiCall';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const RecordSale = () => {
  const [description, setDescription] = useState('');
  const [orderTotalExVAT, setOrderTotalExVAT] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [total, setTotal] = useState('');
  const [vATPercent, setVATPercent] = useState('');
  const [vAT, setVAT] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noDisplay, setNoDisplay] = useState(true);
  const [userFoundDisplay, setUserFoundDisplay] = useState('waiting');
  const [errorText, setErrorText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userToken = useSelector(token);
  const [loading, setLoading] = useState(false);

  const checkHandler = () => {
    setLoading(true);
    const data = { phone_number: phoneNumber };

    if (phoneNumber === '') {
      setNoDisplay(true);
      setLoading(false);
      setErrorText('please Add Phone Number');
    } else {
      PostRequest(userToken.token, data, 'api/vendor/verify-user').then(res => {
        // console.log('validate customer res :', res.data.data.id);
        if (res.data.message === 'User not found') {
          setNoDisplay(true);
          setLoading(false);
          setUserFoundDisplay('false');
          setErrorText(res.data.message);
        } else {
          setNoDisplay(false);
          setLoading(false);
          setUserFoundDisplay('true');
          setCustomerId(res.data.data.id);
          setErrorText(
            'User subscription status : ' + res.data.data.subscription_status,
          );
        }
      });
    }
  };
  const createHandler = () => {
    setLoading(true);
    const data = {
      customer_id: customerId,
      customer_phone_number: phoneNumber,
      description: description,
      order_total: orderTotalExVAT,
      discount_percentage: discountPercent,
      discount_price: discountedPrice,
      total: total,
      vat_percentage: vATPercent,
      vat_price: vAT,
      grand_total: grandTotal,
    };

    PostRequest(userToken.token, data, vendorUris.createOrder).then(res => {
      // console.log('validate customer res :', res.data.success);
      if (res.data.success === false) {
        Alert.alert(res.data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setModalVisible(true);
      }
    });
  };
  const okPressHandler = () => {
    setModalVisible(false);
    setPhoneNumber('');
    setCustomerId('');
    setDescription('');
    setOrderTotalExVAT('');
    setDiscountPercent('');
    setDiscountedPrice('');
    setTotal('');
    setVATPercent('');
    setVAT('');
    setGrandTotal('');
    setUserFoundDisplay('waiting');
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




  const updateData = (value, type) => {
    if (type === 'discount') {
      let discountPrice = 0
      if (value && orderTotalExVAT) {
        discountPrice = ((Number(value) / 100) * Number(orderTotalExVAT)).toFixed(2)
        setDiscountedPrice(((Number(value) / 100) * Number(orderTotalExVAT)).toFixed(2))
      } else {
        setDiscountedPrice(('0'))
      }
      setTotal((orderTotalExVAT - discountPrice).toFixed(2))
    }
    else if (type === 'discount-amount') {
      let percentVal = 0
      if (value && orderTotalExVAT) {
        percentVal = ((Number(value) / Number(orderTotalExVAT)) * 100)
        console.log(percentVal)
        setDiscountPercent(percentVal.toFixed(2))
      } else {
        setDiscountPercent('')
      }
      setTotal((orderTotalExVAT - value).toFixed(2))
    }

    else if (type === 'vat') {
      let percentVat = 0
      if (value && total) {
        percentVat = ((Number(value) / 100) * Number(total))
        console.log(percentVat)
        setVAT(percentVat.toFixed(2))
      } else {
        setVAT('')
      }
      setGrandTotal((Number(total) + Number(percentVat)).toFixed(2))
    }
  }

  return (
    <View style={styles.recordSaleContainer}>
      <View style={loading === false ? { display: 'none' } : styles.loader}>
        <ActivityIndicator size={36} color={MyTheme.yellow} />
      </View>
      <ArrowHeader heading="Sales Order" />

      <View style={globalInputsStyles.globalInputs}>
        <Text style={globalInputsStyles.globalLabel}>Customer Phone* </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.customerPhoneInput}
            onChangeText={value => numberValidations(value)}
            value={phoneNumber}
            placeholder="01234556789"
            maxLength={10}
          />
          <Pressable onPress={() => checkHandler()}>
            <Text style={styles.checkText}>Check</Text>
          </Pressable>
        </View>
      </View>


      {/* <View style={noDisplay === false ? styles.noDisplay : styles.notFound}>
        <Image
          source={require('../../assets/icons/notFound.png')}
          style={styles.notFoundImage}
        />
        <Text style={styles.notFoundText}>{errorText}</Text>
      </View> */}

      {userFoundDisplay !== 'waiting' &&
        <View
          style={[{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end', marginRight: '5%' },
          userFoundDisplay === 'false' ? styles.notFound : userFoundDisplay === true ? styles.userFoundNote : {}
          ]}>

          <Text style={styles.userFoundText}>{errorText}</Text>
          {userFoundDisplay === 'false' && <Image
            source={require('../../assets/icons/notFound.png')}
            style={styles.notFoundImage}
          />}
        </View>
      }


      <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Description </Text>
          <TextInput
            style={
              noDisplay === false
                ? globalInputsStyles.input
                : styles.noUserInput
            }
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            placeholderTextColor={'grey'}
            editable={noDisplay === true ? false : true}
          />
        </View>

        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>
            {' '}
            Order Total {' '}
          </Text>
          <TextInput
            style={
              noDisplay === false
                ? globalInputsStyles.input
                : styles.noUserInput
            }
            onChangeText={setOrderTotalExVAT}
            value={orderTotalExVAT}
            placeholder="Total"
            placeholderTextColor={'grey'}
            editable={noDisplay === true ? false : true}
          />
        </View>


        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Discount %</Text>
          <View style={styles.discountInputContainer}>
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput1
                  : styles.noUserDiscountInput1
              }
              onChangeText={(val) => {
                setDiscountPercent(val)
                updateData(val, 'discount')
              }}
              value={discountPercent}
              placeholder="%"
              editable={noDisplay === true ? false : true}
            />
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput2
                  : styles.noUserDiscountInput2
              }
              onChangeText={(val) => (setDiscountedPrice(val), updateData(val, 'discount-amount'))}
              value={discountedPrice}
              placeholder=""
              editable={noDisplay === true ? false : true}
            />
          </View>
        </View>


        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Total</Text>
          <TextInput
            style={
              noDisplay === false
                ? globalInputsStyles.input
                : styles.noUserInput
            }
            onChangeText={setTotal}
            value={total}
            placeholder="Total"
            editable={false}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>VAT %</Text>
          <View style={styles.discountInputContainer}>
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput1
                  : styles.noUserDiscountInput1
              }
              onChangeText={(val) => (setVATPercent(val), updateData(val, 'vat'))}
              value={vATPercent}
              placeholder="%"
              editable={noDisplay === true ? false : true}
            />
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput2
                  : styles.noUserDiscountInput2
              }
              onChangeText={(val) => (setVAT(val), updateData(val, 'vat-amount'))}
              value={vAT}
              editable={false}
              placeholder=""

            />
          </View>
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Grand Total</Text>
          <TextInput
            style={
              noDisplay === false
                ? globalInputsStyles.input
                : styles.noUserInput
            }
            onChangeText={setGrandTotal}
            value={grandTotal}
            editable={false}
            placeholder=""
          // editable={noDisplay === true ? false : true}
          />
        </View>
        <Pressable style={styles.createPress} onPress={() => createHandler()}>
          <Text style={styles.createPressText}>Create</Text>
        </Pressable>
        {/* <View style={styles.emptyView}></View> */}
      </ScrollView>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.successContainer}>
                <View style={styles.successImage}>
                  <AntDesign
                    name="checkcircle"
                    size={55}
                    color={MyTheme.green}
                  />
                </View>
                <Text style={styles.successText}>Successful !!!</Text>
                <Text style={styles.successMessage}>
                  Order Created Successfully !
                </Text>
                <Pressable
                  style={styles.okPres}
                  onPress={() => okPressHandler()}>
                  <Text style={styles.okPresText}>ok</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
