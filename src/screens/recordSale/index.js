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
import React, {useState} from 'react';
import {ArrowHeader} from '../../components';
import {styles} from './styles';
import {globalInputsStyles, MyTheme, vendorUris} from '../../utils';
import {useSelector} from 'react-redux';
import {token} from '../../redux/tokenSlice';
import {PostRequest} from '../../api/apiCall';

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
  const [noDisplay, setNoDisplay] = useState(false);
  const [userFoundDisplay, setUserFoundDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userToken = useSelector(token);
  const [loading, setLoading] = useState(false);

  const checkHandler = () => {
    setLoading(true);
    const data = {phone_number: phoneNumber};

    if (phoneNumber === '') {
      setNoDisplay(true);
      setLoading(false);
      setErrorText('please Add Phone Number');
    } else {
      PostRequest(userToken.token, data, 'api/vendor/verify-user').then(res => {
        console.log('validate customer res :', res.data.data.id);
        if (res.data.message === 'User not found') {
          setNoDisplay(true);
          setLoading(false);
          setErrorText(res.data.message);
        } else {
          setNoDisplay(false);
          setLoading(false);
          setUserFoundDisplay(true);
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
      console.log('validate customer res :', res.data.success);
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
    setUserFoundDisplay(false);
  };

  return (
    <View style={styles.recordSaleContainer}>
      <View style={loading === false ? {display: 'none'} : styles.loader}>
        <ActivityIndicator size={36} color={MyTheme.yellow} />
      </View>
      <ArrowHeader heading="Sales Order" />
      <View style={globalInputsStyles.globalInputs}>
        <Text style={globalInputsStyles.globalLabel}>Customer Phone* </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.customerPhoneInput}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="012345567"
          />
          <Pressable onPress={() => checkHandler()}>
            <Text style={styles.checkText}>Check</Text>
          </Pressable>
          <View
            style={noDisplay === false ? styles.noDisplay : styles.notFound}>
            <Image
              source={require('../../assets/icons/notFound.png')}
              style={styles.notFoundImage}
            />
            <Text style={styles.notFoundText}>{errorText}</Text>
          </View>
          <View
            style={
              userFoundDisplay === false
                ? styles.noDisplay
                : styles.userFoundNote
            }>
            <Text style={styles.userFoundText}>{errorText}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
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
            placeholder=""
            editable={noDisplay === true ? false : true}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>
            {' '}
            Order Total _Ex-VAT{' '}
          </Text>
          <TextInput
            style={
              noDisplay === false
                ? globalInputsStyles.input
                : styles.noUserInput
            }
            onChangeText={setOrderTotalExVAT}
            value={orderTotalExVAT}
            placeholder=""
            editable={noDisplay === true ? false : true}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>Discount</Text>
          <View style={styles.discountInputContainer}>
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput1
                  : styles.noUserDiscountInput1
              }
              onChangeText={setDiscountPercent}
              value={discountPercent}
              placeholder=""
              editable={noDisplay === true ? false : true}
            />
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput2
                  : styles.noUserDiscountInput2
              }
              onChangeText={setDiscountedPrice}
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
            placeholder=""
            editable={noDisplay === true ? false : true}
          />
        </View>
        <View style={globalInputsStyles.globalInputs}>
          <Text style={globalInputsStyles.globalLabel}>VAT</Text>
          <View style={styles.discountInputContainer}>
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput1
                  : styles.noUserDiscountInput1
              }
              onChangeText={setVATPercent}
              value={vATPercent}
              placeholder=""
              editable={noDisplay === true ? false : true}
            />
            <TextInput
              style={
                noDisplay === false
                  ? styles.discountInput2
                  : styles.noUserDiscountInput2
              }
              onChangeText={setVAT}
              value={vAT}
              placeholder=""
              editable={noDisplay === true ? false : true}
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
            placeholder=""
            editable={noDisplay === true ? false : true}
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
                <Image
                  source={require('../../assets/images/success.png')}
                  style={styles.successImage}
                />
                <Text style={styles.successText}>Successful !!!</Text>
                <Text style={styles.successMessage}>
                  Recode has been submit Successfully !
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
