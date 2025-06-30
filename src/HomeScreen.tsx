import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { homeComponent, payComponent, ginieComponent, borderComponent } from './paymentScreen';

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 90,
    paddingBottom: 40,
    // backgroundColor: '#181818',
  },
  navItem: {
    alignItems: 'center',
    opacity: 0.6,
  },
  navItemActive: {
    alignItems: 'center',
  },
  navLabelInactive: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    opacity: 0.5,
    textTransform: 'lowercase',
  },
  navLabelActive: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
});

const HomeScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'flex-end' }}>
      {/* Border at the bottom */}
      <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 90, left: 0 }}>
        {borderComponent({})}
      </View>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          {homeComponent({})}
          <Text style={styles.navLabelInactive}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive} onPress={() => navigation.navigate('PaymentScreen')}>
          {payComponent({})}
          <Text style={styles.navLabelActive}>yolo pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('GinieScreen')}>
          {ginieComponent({})}
          <Text style={styles.navLabelInactive}>ginie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen; 