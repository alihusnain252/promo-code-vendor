import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Notifications = ({navigation}) => {
  const notifications = [
    {
      id: 1,
      heading: 'Notification Heading here',
      description: 'Some lru ipsum test wil be here',
    },
    {
      id: 2,
      heading: 'Notification Heading here',
      description: 'Some lru ipsum test wil be here',
    },
    {
      id: 3,
      heading: 'Notification Heading here',
      description: 'Some lru ipsum test wil be here',
    },
  ];

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="#000" />
        </Pressable>
        <Text style={styles.notificationHeaderText}>NotifiCations</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {notifications.map(not => {
          return (
            <NotificationCard
              key={not.id}
              heading={not.heading}
              description={not.description}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const NotificationCard = props => {
  return (
    <View style={styles.notificationCard} >
      <Text style={styles.notificationHeadings}>{props.heading}</Text>
      <Text style={styles.notificationDescription}>{props.description}</Text>
    </View>
  );
};
