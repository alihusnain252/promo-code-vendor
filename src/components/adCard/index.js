import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import image from '../../assets/images/image8.png';

export const AdCard = ({data}) => {
  // console.log("Card Details : " ,data.discounted_price);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTopView}>
        <Image source={data != ""?{uri:data.image}:image} style={styles.cardImage} />
        <View style={styles.adDetails}>
          <Text style={styles.originalPrice}>{data!=""?data.original_price:`140$`}</Text>
          <Text style={styles.discountPrice}>
          {data!=""?data.discounted_price:`70$`}<Text style={styles.off}>OFF</Text>
          </Text>
          <Text style={styles.adTitle}>{data!=""?data.promotion_details:`promotion_details`}  </Text>
          <Text style={styles.expiry}>
            {data!=""?`${data.status} - Promo Expiring in ${data.promotion_duration} hours`:`Active - Promo Expiring in {15} hours`}
          </Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.bottomLeft}>
          <Text style={styles.companyName}>{data!=""?data.company_name:`Promo Company Name here`}</Text>
          <Text style={styles.categoryName}>{data!=""?data.category_name:`Category Name`}</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={styles.availableTill}>{data!=""?`Available Till:${data.expiry_date}`:`Available Till: data `}</Text>
          <Text style={styles.ratings}>⭐️ 5.0 </Text>
        </View>
      </View>
    </View>
  );
};
