import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {ArrowHeader} from '../../components';
import {styles} from './styles';
import {globalInputsStyles} from '../../utils';

export const RecordSale = () => {
  const [description, setDescription] = useState('');
  const [orderTotalExVAT, setOrderTotalExVAT] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [total, setTotal] = useState('');
  const [vATPercent, setVATPercent] = useState('');
  const [vAT, setVAT] = useState('');
  const [grandTotal, setGrandTotal] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [noDisplay, setNoDisplay] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const recordOrderData = {
    description: 'Pizza, Jollof, Drinks',
    orderTotalExVAT: '3,250.50',
    discountPercent: '20',
    discountedPrice: '650.10',
    vATPercent: '21.90',
    vATPrice: '579.48',
    total: '2,600.40',
    grandTotal: '569.48',
  };

  const checkHandler = () => {
    if (phoneNumber === '') {
      setNoDisplay(true);
      setErrorText('please Add Phone Number');
      setDescription('');
      setOrderTotalExVAT('');
      setDiscountPercent('');
      setDiscountedPrice('');
      setTotal('');
      setVAT('');
      setVATPercent('');
      setGrandTotal('');
    } else {
      if (phoneNumber === '1234') {
        setNoDisplay(false);
        setDescription(recordOrderData.description);
        setOrderTotalExVAT('GHS  ' + recordOrderData.orderTotalExVAT);
        setDiscountPercent(recordOrderData.discountPercent + '%');
        setDiscountedPrice('GHS ' + recordOrderData.discountedPrice);
        setTotal('GHS ' + recordOrderData.total);
        setVAT('GHS ' + recordOrderData.vATPrice);
        setVATPercent(recordOrderData.vATPrice + '%');
        setGrandTotal('GHS ' + recordOrderData.grandTotal);
      } else {
        setNoDisplay(true);
        setErrorText('User not found');
        setDescription('');
        setOrderTotalExVAT('');
        setDiscountPercent('');
        setDiscountedPrice('');
        setTotal('');
        setVAT('');
        setVATPercent('');
        setGrandTotal('');
      }
    }
  };
  const createHandler = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.recordSaleContainer}>
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
                  onPress={() => setModalVisible(false)}>
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
