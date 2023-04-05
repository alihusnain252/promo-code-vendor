import {MyTheme} from '@utils';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  userFoundContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: MyTheme.white,
  },
  userFoundHeader: {
    width: '100%',
    flexDirection: 'row',
    width: width - 40,
    height: 21,
    marginTop: 18,
    alignItems: 'center',
  },
  userFoundHeaderText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 21,
    color: MyTheme.black,
    marginLeft: 11,
  },
  userImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%",
    height:194
  },
  userImageView: {
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor:MyTheme.grey400,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center"
  },
  userFoundImage:{
    width:"100%",
    height:"100%",
  },
  userText:{
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 21,
    marginTop:7,
    color:MyTheme.darkLemonLime
  },
  userDetailsContainer:{
    width:width-28
  },
  userDetails:{
    alignItems:"center",
    flexDirection:"row",
    width:"100%",
    marginTop:2,
    height:27,
  },
  userDetailsIcon:{
    width:12,
    height:12,
  },
  userDetailsText:{
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 11,
    lineHeight: 21,
    color: MyTheme.black,
    marginLeft:5,
  },
  boldText:{
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: 12,
    lineHeight: 21,
    color: MyTheme.black,
  },
  subscription:{
    // width:54,
    // height:17,
    backgroundColor:MyTheme.darkLemonLime,
    paddingHorizontal:10,
    fontFamily: MyTheme.poppins,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 21,
    borderRadius:4,
    color:MyTheme.white,
    marginLeft:5,
  },
  sendSMS: {
    height: 56,
    width: width - 40,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 69,
    backgroundColor: MyTheme.yellow,
  },
  sendSMSText: {
    fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: MyTheme.white,
  },
});
