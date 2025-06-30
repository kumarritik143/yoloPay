import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, G, Path, Circle } from "react-native-svg";
import { faker } from '@faker-js/faker';
import { useNavigation } from '@react-navigation/native'


const PaymentScreen = () => {
  const navigation: any = useNavigation();
  const [isFrozen, setIsFrozen] = useState(true);
  const [showCVV, setShowCVV] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: ['', '', '', ''],
    expiry: '',
    cvv: '',
  });

  const generateCardDetails = () => {
    return {
      number: [
        faker.finance.creditCardNumber('####'),
        faker.finance.creditCardNumber('####'),
        faker.finance.creditCardNumber('####'),
        faker.finance.creditCardNumber('####'),
      ],
      expiry: faker.date.future().toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' }).replace(/\d{2}\/(\d{2})$/, (m, y) => y + '/' + m.slice(0, 2)),
      cvv: faker.finance.creditCardCVV(),
    };
  };

  const handleUnfreeze = () => {
    if (isFrozen) {
      setCardDetails(generateCardDetails());
    }
    setIsFrozen(!isFrozen);
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>select payment mode</Text>
        <Text style={styles.subtitle}>choose your preferred payment method to{"\n"}make payment.</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity style={styles.payButton}>
            <Image source={require('./pay.png')} style={{ width: 96, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <Image source={require('./card.png')} style={{ width: 96, height: 40 }} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Section */}
      <View style={styles.cardSection}>
        <Text style={styles.cardLabel}>YOUR DIGITAL DEBIT CARD</Text>
        <View style={styles.cardRow}>
          <View style={styles.cardImageWrap}>
            <Image source={require('./card-bg.png')} style={styles.cardImage} resizeMode="cover" />
            {/* Black opacity overlay */}
            {!isFrozen && (
              <View style={styles.cardBlackOverlay} />
            )}
            {/* Card Details Overlay */}
            {!isFrozen && (
              <View style={styles.cardDetailsOverlay}>
                {/* YOLO logo - top left */}
                <View style={{ position: 'absolute', top: 10, left: 20 }}>
                  {yoloComponent({})}
                </View>
                {/* YES BANK logo - top right */}
                <View style={{ position: 'absolute', top: 5, right: 10 }}>
                  {yesBankComponent({})}
                </View>
                {/* RuPay logo - bottom right */}
                <View style={{ position: 'absolute', bottom: 10, right: 2 }}>
                  {rupayComponent({})}
                </View>
                {/* Card Numbers (left) */}
                <View style={{ position: 'absolute', top: 80, left: 20 }}>
                  <Text style={styles.cardNumber}>{cardDetails.number[0]}</Text>
                  <Text style={styles.cardNumber}>{cardDetails.number[1]}</Text>
                  <Text style={styles.cardNumber}>{cardDetails.number[2]}</Text>
                  <Text style={styles.cardNumber}>{cardDetails.number[3]}</Text>
                </View>
                {/* Expiry, CVV, and *** in the same column (right) */}
                <View style={{ position: 'absolute', top: 85, right: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
                  {/* Expiry */}
                  <Text style={styles.cardLabelExpiry}>expiry</Text>
                  <Text style={styles.cardValue}>{cardDetails.expiry}</Text>
                  {/* Space between expiry and cvv */}
                  <View style={{ height: 16 }} />
                  {/* CVV */}
                  <Text style={styles.cardLabelCvv}>cvv</Text>
                  <View style={{ position: 'absolute', top: 65, right: -5, flexDirection: 'row', alignItems: 'center' }}>
                    {showCVV ? (
                      <Text style={styles.cardValue}>{cardDetails.cvv}</Text>
                    ) : (
                      <Image
                        source={require('./hidden.png')}
                        style={{ width: 32, height: 18 }}
                        resizeMode="contain"
                      />
                    )}
                    <TouchableOpacity onPress={() => setShowCVV((prev) => !prev)}>
                      <Image
                        source={require('./cvv.png')}
                        style={{ width: 18, height: 18, marginLeft: 8 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Copy details */}
                <View style={{ position: 'absolute', bottom: 60, left: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('./copy.png')}
                    style={{ width: 18, height: 18, marginRight: 8 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.copyDetails}>copy details</Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.freezeCol}>
            <TouchableOpacity style={styles.freezeButton} onPress={handleUnfreeze}>
              {isFrozen ? unfreezeComponent({}) : freezeComponent({})}
              <Text
                style={[styles.freezeText, { color: isFrozen ? '#A90808' : '#fff' }]}
              >
                {isFrozen ? 'unfreeze' : 'freeze'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Border above bottom navigation */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingHorizontal: 28,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  subtitle: {
    color: '#bdbdbd',
    fontSize: 14,
    marginBottom: 28,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: -80,
  },
  payButton: {
    backgroundColor: '#111',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 2,
    marginRight: 0,
  },
  cardButton: {
    backgroundColor: '#111',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  cardSection: {
    paddingHorizontal: 28,
  },
  cardLabel: {
    color: '#bdbdbd',
    fontSize: 12,
    marginBottom: 20,
    letterSpacing: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImageWrap: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 18,
    width: 186,
    height: 296,
  },
  cardImage: {
    width: 186,
    height: 296,
    borderRadius: 18,
    marginRight: 24,
  },
  freezeCol: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:15
  },
  freezeButton: {
    alignItems: 'center',
  },
  freezeText: {
    color: '#A90808',
    fontSize: 14,
    marginTop: 8,
    textTransform: 'lowercase',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 90,
    paddingBottom: 40,
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
  cardDetailsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    padding: 0,
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 6, fontFamily: 'Linndale Square NF W01 Regular',marginBottom:5 },
  cardLabelCvv: { color: '#bdbdbd', fontSize: 12, marginRight: 30},
  cardLabelExpiry:{ color: '#bdbdbd', fontSize: 12, marginRight: 15},
  cardValue: { color: '#fff', fontSize: 14, marginRight: 12,marginTop:3 },
  copyDetails: { color: '#ED1C24', fontSize: 14, fontWeight: 'bold', },
  cardBlackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 18,
    zIndex: 1,
  },
});

export default PaymentScreen;

const unfreezeComponent = (props: object) => (
  <View style={{ width: 58, height: 58, alignItems: 'center', justifyContent: 'center' }}>
    <Svg
      width={58}
      height={58}
      viewBox="0 0 58 58"
      fill="none"
      style={{ position: 'absolute' }}
      {...props}
    >
      <Rect
        opacity={0.2}
        x={0.5}
        y={0.5}
        width={57}
        height={57}
        rx={28.5}
        fill="#000"
        stroke="url(#paint0_linear_1_305)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_305"
          x1={0}
          y1={-12.6875}
          x2={0.00000100555}
          y2={59.1694}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#A90808" />
          <Stop offset={1} stopColor="#A90808" />
        </LinearGradient>
      </Defs>
    </Svg>
    <Image
      source={require('./unfreeze.png')}
      style={{ width: 28, height: 28 }}
      resizeMode="contain"
    />
  </View>
);

const homeComponent = (props: object) => (
  <View style={{ width: 41, height: 41, alignItems: 'center', justifyContent: 'center' }}>
    <Svg
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
      style={{ position: 'absolute' }}
      {...props}
    >
      <Circle
        opacity={0.1}
        cx={20.5}
        cy={20.5}
        r={20}
        stroke="url(#paint0_linear_6059_70)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_6059_70"
          x1={20.5}
          y1={0}
          x2={20.5}
          y2={41}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.0151992} stopColor="white" />
          <Stop offset={1} stopColor="#0D0D0D" />
        </LinearGradient>
      </Defs>
    </Svg>
    <Image
      source={require('./home.png')}
      style={{ width: 22, height: 22 }}
      resizeMode="contain"
    />
  </View>
);

function payComponent(props: object) {
  return (
    <View style={{ width: 51, height: 51, alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={51}
        height={51}
        viewBox="0 0 51 51"
        fill="none"
        style={{ position: 'absolute' }}
        {...props}
      >
        <Circle cx={25.5} cy={25.5} r={25} stroke="url(#paint0_linear_6059_78)" />
        <Defs>
          <LinearGradient
            id="paint0_linear_6059_78"
            x1={0}
            y1={0}
            x2={7.13681e-7}
            y2={51}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
      <Image
        source={require('./scan.png')}
        style={{ width: 28, height: 28 }}
        resizeMode="contain"
      />
    </View>
  );
}

const ginieComponent = (props: object) => (
  <View style={{ width: 41, height: 41, alignItems: 'center', justifyContent: 'center' }}>
    <Svg
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
      style={{ position: 'absolute' }}
      {...props}
    >
      <Circle
        opacity={0.1}
        cx={20.5}
        cy={20.5}
        r={20}
        stroke="url(#paint0_linear_6059_80)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_6059_80"
          x1={20.5}
          y1={0}
          x2={20.5}
          y2={41}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
    <Image
      source={require('./ginie.png')}
      style={{ width: 22, height: 22 }}
      resizeMode="contain"
    />
  </View>
);

function yoloComponent(props: object) {
    return (
      <Svg
        width={49}
        height={16}
        viewBox="0 0 49 16"
        fill="none"
        {...props}
      >
        <Path
          d="M37.455 14.587c.06-.158.473-.862.583-1.008.048.024.11.048.158.085a5.94 5.94 0 002.017.692 6.18 6.18 0 007.084-5.258 6.161 6.161 0 00-6.647-6.97 6.182 6.182 0 00-5.492 4.833 6.138 6.138 0 00.352 3.728c.11.28.219.546.28.85a3.158 3.158 0 01-1.446 3.29 3.21 3.21 0 01-1.701.474H28.39c-.802 0-1.495-.28-2.102-.801a2.799 2.799 0 01-.414-.438c-.024-.024-.036-.06-.073-.109.073-.121.17-.218.256-.328.073-.109.158-.218.243-.315.085-.11.158-.231.243-.352.036.072.073.109.097.157.316.523.777.838 1.373.972.11.024.23.036.34.036h4.35c.839 0 1.616-.558 1.884-1.408.352-1.142-.401-2.344-1.58-2.538-.133-.024-.267-.024-.4-.036h-1.593c-.085 0-.182 0-.267-.037a.58.58 0 01-.377-.425 1.81 1.81 0 01-.024-.267V3.962c0-.182 0-.364-.049-.546a2.028 2.028 0 00-1.883-1.579 2.003 2.003 0 00-2.03 1.53c-.036.158-.06.316-.06.474v3.982c0 .365-.024.717-.085 1.081a9.5 9.5 0 01-.583 2.064c-.535 1.287-1.41 2.295-2.552 3.084a7.164 7.164 0 01-2.868 1.166 7.344 7.344 0 01-8.409-5.549 8.345 8.345 0 01-.17-1.105c0-.085 0-.158.073-.218.34-.328.68-.656 1.033-.984.012-.012.037-.024.073-.048v.085c-.11 1.177.085 2.307.632 3.35.935 1.798 2.394 2.89 4.374 3.303a6.174 6.174 0 007.145-4.65 5.72 5.72 0 00.158-1.275V4.193v-.364c.012-1.142.51-2.04 1.47-2.66 1.848-1.177 4.326-.194 4.825 2.016.06.255.072.51.072.777V8.71c0 .085 0 .158.025.255h1.008c.413 0 .827.06 1.215.194.025 0 .061.012.098.024v-.121a7.2 7.2 0 01-.037-.886c.037-1.761.608-3.327 1.75-4.675 1.094-1.287 2.479-2.113 4.144-2.44a7.329 7.329 0 018.566 5.415 7.337 7.337 0 01-5.517 8.937 7.272 7.272 0 01-1.846.17 7.492 7.492 0 01-3.342-.924 1.119 1.119 0 01-.158-.097l.037.025z"
          fill="#ED1C24"
        />
        <Path
          d="M23.809 2.445c.012.558.024 1.104.024 1.687-.049-.036-.073-.048-.073-.073-.17-.182-.34-.376-.523-.546a6.046 6.046 0 00-3.123-1.578 5.866 5.866 0 00-1.725-.061 6.183 6.183 0 00-3.014 1.166l-.218.182c-1.045 1.02-2.078 2.04-3.123 3.06-.79.777-1.592 1.542-2.382 2.319-.194.182-.158.121-.158.376v3.873c0 .717-.23 1.348-.692 1.882-.644.753-1.483 1.105-2.48 1.045a2.962 2.962 0 01-2.636-2.089 2.977 2.977 0 01-.134-.923V9.16c0-.34.037-.23-.182-.461C2.532 7.81 1.693 6.938.867 6.05c-.62-.668-.887-1.457-.79-2.356A2.914 2.914 0 012.52 1.121c.985-.158 1.848.121 2.564.814.426.412.839.837 1.252 1.25.049.049.097.097.146.134.073 0 .11-.06.146-.097l1.276-1.275a2.946 2.946 0 011.239-.74 2.938 2.938 0 013.11.934c.05.049.086.11.122.158-.085.121-.62.668-.814.838-.073 0-.085-.073-.11-.122-.255-.352-.583-.595-1.008-.692-.607-.146-1.142-.012-1.616.377-.06.048-.11.109-.17.157l-1.64 1.64-.11.109a.603.603 0 01-.826 0l-.11-.11-1.676-1.675a1.814 1.814 0 00-1.118-.546 1.808 1.808 0 00-.912.145 1.782 1.782 0 00-.559 2.842c.875.934 1.75 1.87 2.637 2.792.037.037.073.085.122.122.182.157.243.364.243.607v3.958c0 .182.012.352.06.522a1.796 1.796 0 001.702 1.348 1.79 1.79 0 001.81-1.53c.012-.11.012-.218.012-.328V8.625v-.11c0-.182.061-.34.195-.473.219-.206.425-.425.632-.631l1.13-1.13c.607-.595 1.227-1.177 1.835-1.76.303-.292.607-.583.899-.874.182-.17.352-.352.51-.535 1.203-1.311 2.673-2.16 4.423-2.5 1.568-.304 3.05-.025 4.435.764.486.28.948.62 1.373.984.025.024.05.036.073.06l.013.025z"
          fill="#ED1C24"
        />
      </Svg>
    )
  }

  function yesBankComponent(props: object) {
    return (
      <Svg
        width={49}
        height={22}
        viewBox="0 0 49 22"
        fill="none"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.194 18.251V7.517h23.878L16.1 18.251H.194zm18.507 0l6.063-10.734h23.404v10.734h-29.48.013z"
          fill="#0862AB"
        />
        <Path
          d="M48.374 7.323H0v11.122h16.283l.218-.121 7.255-9.775-5.067 8.974-.62.922h30.305V7.323zm-25.044.559l-7.424 9.993H.56V7.882H23.33zm24.473 0v9.993h-28.47l5.65-9.993h22.82z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.341 15.434c.098-.109.365-.874.438-.886h2.236l.4.886h.912l-1.179-2.598c-.194-.437-.4-.862-.595-1.3l-.523-1.14c-.048-.122-.036-.134-.097-.134-.049.012-.036 0-.06.073l-.572 1.214c-.206.425-.4.862-.607 1.299l-1.07 2.27c-.036.086-.121.243-.145.328h.862v-.012zm.742-1.602c.036-.134.777-1.822.826-1.858l.802 1.857H31.083zm11.543-1.02c.134-.122.426-.474.571-.595l1.41-1.494c.085-.097.206-.194.267-.303h-.911c-.085 0-.073 0-.122.024l-.838.886s-.085.085-.134.146c-.364.388-.729.777-1.105 1.166-.025-.68 0-1.518 0-2.235H40.9v5.015h.863v-.073c.012-.595 0-1.323 0-1.943v-.315l2.15 2.234c.085.085.037.097.195.097h1.008l-.62-.656c-.109-.097-.194-.218-.303-.327l-1.106-1.142s-.11-.097-.158-.158c-.06-.072-.267-.267-.304-.34v.013zm-14.618-.061c.365-.17.669-.352.754-.814.097-.51-.085-.922-.353-1.153-.291-.255-.717-.352-1.203-.364h-1.543v5.014c.523.012 1.179.025 1.701-.012.486-.036.887-.158 1.215-.473.28-.28.413-.838.292-1.336-.158-.692-.765-.765-.838-.85l-.025-.012zm-1.53-.255v-1.42c.315-.037.96-.013 1.214.17.146.108.231.266.231.521-.012.705-.923.85-1.446.729zm0 2.222v-1.566c.376-.061 1.032-.013 1.312.206.291.23.328.826 0 1.13-.256.242-1.021.303-1.325.23h.012zm9.538-2.465c.06.036.753.777.826.85.134.146.268.28.401.425.328.352.705.716 1.021 1.068l.802.838c.158.158.121.158.243.158V10.42h-.85v3.18l-1.228-1.274c-.073-.06-.134-.146-.206-.219-.061-.072-.134-.133-.207-.206-.45-.498-.96-.996-1.41-1.481-.036-.037-.06-.073-.097-.11-.048-.048-.048-.048-.146-.048v5.172h.839v-3.169l.012-.012zM12.735 15.361c1.13.413 2.746.389 3.074-.983.22-.935-.291-1.494-1.045-1.907l-.729-.412c-.607-.353-.328-.96.377-.838.206.036.4.109.571.194.182.085.328.182.486.255v-1.166c-.194-.048-.377-.121-.595-.17-2.188-.498-2.832 1.457-1.81 2.38.145.134.254.219.437.328.328.206.607.328.935.559.56.376.28 1.104-.753.898-.498-.097-.936-.425-1.057-.461l.097 1.323h.012zm-1.215-.971H9.6v-.996h1.628v-1.02H9.6v-.91h1.908V10.43H8.47v5.003h3.05V14.39zm-6.683-1.336s.012-.024.024.049v2.331h1.154c.025-.62 0-1.47 0-2.137v-.23c0-.074 0-.037.025-.062.121-.206 1.41-1.918 1.664-2.246.085-.109.17-.218.231-.328H6.684l-1.13 1.567c-.098-.097-1.009-1.554-1.045-1.567H3.087l.437.656c.146.219.304.437.438.656l.887 1.311h-.012z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.611 4.166l-9.648 17.072L14.18 18.3l1.896.06L26.611 4.166z"
          fill="#ED1C24"
        />
        <Path
          d="M24.97 7.833l-.327-.182 2.126-3.788-2.83 3.934-.293-.219 5.42-7.03-4.095 7.285zM16.988 21.541l-2.941-3.12.267-.243 2.625 2.769 1.725-2.72.316.194-1.992 3.12z"
          fill="#fff"
        />
      </Svg>
    )
  }

  function rupayComponent(props: object) {
    return (
      <Svg
        width={72}
        height={35}
        viewBox="0 0 72 35"
        fill="none"
        {...props}
      >
        <Path
          d="M67.076 1.482l3.998 7.94-8.409 7.966 4.411-15.906z"
          fill="#048040"
        />
        <Path
          d="M64.294 1.482l4.01 7.94-8.421 7.966 4.41-15.906z"
          fill="#F37124"
        />
        <Path
          d="M.062 14.498L4.059.11h6.392c1.993 0 3.33.316 4.01.971.668.644.802 1.7.4 3.181-.242.875-.619 1.603-1.13 2.186-.51.583-1.178 1.044-2.004 1.372.692.17 1.142.51 1.349 1.008.194.498.182 1.238-.061 2.186l-.486 2.003v.049c-.146.57-.097.874.121.898l-.146.534H8.18c.012-.34.036-.643.072-.898.037-.255.073-.462.11-.595l.4-1.433c.207-.74.22-1.263.025-1.566-.182-.304-.62-.462-1.288-.462h-1.81L4.302 14.51H.074l-.012-.012zm6.5-8.208h1.945c.68 0 1.178-.097 1.494-.303.316-.207.547-.535.68-1.045.134-.51.11-.862-.096-1.056-.207-.194-.68-.291-1.434-.291H7.316L6.562 6.29zM26.71 3.874l-2.953 10.612h-3.573l.438-1.554c-.632.62-1.276 1.08-1.92 1.384a4.724 4.724 0 01-2.041.45c-.596 0-1.106-.11-1.507-.316a2.079 2.079 0 01-.924-.96c-.182-.376-.267-.837-.23-1.384.036-.534.218-1.457.57-2.732l1.532-5.5h3.912L18.496 9.35c-.22.802-.28 1.372-.17 1.676.109.315.412.473.899.473.486 0 .91-.182 1.251-.534.34-.364.62-.899.814-1.627l1.52-5.464h3.912-.012zM25.288 14.498L29.274.11h5.492c1.215 0 2.15.073 2.82.23.668.146 1.19.39 1.579.73.486.448.79 1.007.911 1.675.11.668.049 1.445-.206 2.367-.45 1.603-1.24 2.842-2.346 3.704-1.117.85-2.503 1.275-4.167 1.275h-2.564l-1.215 4.407H25.288zm6.477-7.916h1.373c.887 0 1.519-.11 1.883-.328.353-.207.608-.595.766-1.142.146-.558.11-.947-.122-1.153-.23-.219-.802-.328-1.713-.328h-1.373l-.814 2.95zM44.475 14.498l.036-1.02c-.632.474-1.263.826-1.907 1.057-.645.23-1.325.34-2.054.34-1.118 0-1.883-.304-2.333-.887-.438-.583-.51-1.42-.219-2.501.292-1.044.802-1.821 1.543-2.331.742-.498 1.969-.862 3.694-1.093.22-.037.51-.06.875-.11 1.276-.145 1.993-.485 2.139-1.044.085-.303.036-.534-.158-.667-.182-.146-.523-.207-1.009-.207-.4 0-.74.085-.996.255-.267.17-.474.437-.608.801h-3.815c.352-1.19 1.045-2.1 2.102-2.707 1.057-.607 2.443-.91 4.156-.91.814 0 1.53.072 2.175.242.644.158 1.106.389 1.41.656.376.34.595.728.656 1.153.073.425 0 1.032-.231 1.834l-1.64 5.925a1.31 1.31 0 00-.037.522c.024.146.097.28.207.364l-.086.304h-3.937l.037.024zm.948-4.747c-.413.17-.96.327-1.629.497-1.057.28-1.652.656-1.774 1.13-.085.303-.06.534.097.704.146.17.402.255.754.255.644 0 1.166-.158 1.555-.486.39-.328.68-.85.887-1.554.037-.158.073-.267.085-.34l.025-.194M48.435 18.675l.875-3.145h1.118c.377 0 .669-.072.875-.206.207-.134.353-.376.438-.692.036-.134.06-.291.085-.461.012-.17.012-.365 0-.583l-.596-9.714h3.962l-.061 6.435 3.463-6.435h3.682l-6.112 10.564c-.693 1.177-1.203 1.99-1.52 2.428-.315.437-.619.777-.91 1.008a3.507 3.507 0 01-1.252.68c-.45.133-1.142.206-2.078.206-.267 0-.571 0-.911-.024-.328-.012-.68-.037-1.045-.06"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.924 34.423l.887-3.703h.717c1.045 0 1.871-.024 2.6-.558.657-.474 1.058-1.19 1.155-2.089.085-.753-.134-1.384-.608-1.797-.583-.51-1.312-.522-2.248-.522H18.63l-2.078 8.657h1.36l.013.012zm1.179-4.93l.595-2.5h.438c1.251 0 1.883.157 1.774 1.14-.122 1.142-.899 1.36-2.358 1.36h-.462.013zm7.254.122l.632-2.622h.218c1.252 0 1.884.157 1.775 1.202-.134 1.202-.912 1.42-2.358 1.42h-.267zm-1.154 4.808l.899-3.703h.316l1.883 3.703h1.531l-1.993-3.752c1.47-.23 2.37-1.177 2.528-2.598.085-.753-.146-1.384-.62-1.797-.583-.51-1.312-.522-2.248-.522h-1.567l-2.078 8.657h1.349v.012zm6.05 0h4.861l.304-1.25h-3.511l.668-2.793h3.511l.292-1.214h-3.5l.511-2.186h3.512l.291-1.226h-4.86l-2.078 8.657v.012zm8.58 0l.887-3.703h.717c1.045 0 1.871-.024 2.6-.558.656-.474 1.057-1.19 1.154-2.089.085-.753-.133-1.384-.607-1.797-.583-.51-1.312-.522-2.248-.522h-1.798l-2.078 8.657h1.36l.013.012zm1.178-4.93l.596-2.5h.437c1.252 0 1.884.157 1.774 1.14-.121 1.142-.899 1.36-2.357 1.36h-.462.012zm6.283 1.737l1.36-2.125c.195-.303.402-.668.632-1.105.037.486.061.85.11 1.08l.437 2.15h-2.54zm-3.512 3.193l6.003-8.997 2.187 8.997h-1.41l-.486-2.052h-3.45l-1.362 2.052h-1.482zm9.271 0h1.373l2.09-8.657h-1.385l-2.078 8.657zm3.986 0h2.88c.62 0 1.24-.024 1.895-.206a4.506 4.506 0 002.042-1.214c.79-.814 1.336-1.955 1.47-3.218.158-1.408-.243-2.55-1.093-3.254-.912-.753-1.981-.79-3.293-.79h-1.847L57.014 34.4l.024.024zm1.653-1.238l1.482-6.193h.583c.997 0 1.774.013 2.406.547.608.51.887 1.323.778 2.319-.122 1.166-.705 2.173-1.555 2.744-.863.583-1.86.595-3.196.595h-.498v-.012z"
          fill="#fff"
        />
      </Svg>
    )
  }

  function borderComponent(props: object) {
    return (
      <Svg
        width={360}
        height={34}
        viewBox="0 0 360 34"
        fill="none"
        {...props}
      >
        <Path
          opacity={0.8}
          d="M0 33c140.577-42.228 219.414-43.103 360 0"
          stroke="url(#paint0_linear_6059_5)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_6059_5"
            x1={180}
            y1={1}
            x2={180}
            y2={33}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    )
  }
  function freezeComponent(props: object) {
    return (
      <View style={{ width: 58, height: 58, alignItems: 'center', justifyContent: 'center' }}>
        <Svg
          width={58}
          height={58}
          viewBox="0 0 58 58"
          fill="none"
          style={{ position: 'absolute' }}
          {...props}
        >
          <Rect
            opacity={0.2}
            x={0.5}
            y={0.5}
            width={57}
            height={57}
            rx={28.5}
            fill="#000"
            stroke="url(#paint0_linear_1_107)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1_107"
              x1={0}
              y1={-12.6875}
              x2={0.00000100555}
              y2={59.1694}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#fff" />
              <Stop offset={1} stopColor="#fff" stopOpacity={0} />
            </LinearGradient>
          </Defs>
        </Svg>
        <Image
          source={require('./freeze.png')}
          style={{ width: 28, height: 28 }}
          resizeMode="contain"
        />
      </View>
    );
  }

export { homeComponent, payComponent, ginieComponent, borderComponent };