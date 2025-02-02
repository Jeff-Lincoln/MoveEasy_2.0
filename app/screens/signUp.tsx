import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '../../constants/Styles';
import Colors from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

const signUp = () => {
  const [countryCode, setCountryCode] = useState('+254');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { signUp } = useSignUp();

  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({ pathname: '/verify/[phone]', params: { phoneNumber: fullPhoneNumber } });
    } catch (error) {
      console.log('Error Signing up! ', error);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={[defaultStyles.container, styles.mainContainer]}>
          <View style={styles.headerSection}>
            <MaterialIcons name="phone-android" size={44} color={Colors.primary} style={styles.icon} />
            <Text style={[defaultStyles.header, styles.headerText]}>Let's Get Started!😁</Text>
            <Text style={[defaultStyles.descriptionText, styles.description]}>
              Enter your phone number. We will send you a confirmation code there
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.countryCodeInput]}
              placeholder="Country Code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
              onChangeText={setCountryCode}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, styles.phoneNumberInput]}
              placeholder="Mobile Number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Link href="/screens/login" replace asChild>
            <TouchableOpacity style={styles.linkContainer}>
              <Text style={[defaultStyles.textLink, styles.linkText]}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={{ flex: 1 }} />
          
          <TouchableOpacity
            onPress={onSignUp}
            style={[
              defaultStyles.pillButton,
              phoneNumber !== '' ? styles.enabled : styles.disabled,
              styles.signUpButton,
            ]}>
            <Text style={[defaultStyles.buttonText, styles.buttonText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default signUp;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  icon: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: Colors.gray,
  },
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 18,
    marginRight: 10,
    color: Colors.dark,
  },
  phoneNumberInput: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  countryCodeInput: {
    width: 100,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  enabled: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1 }],
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
    transform: [{ scale: 0.98 }],
  },
  signUpButton: {
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  }
});



// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable prettier/prettier */
// /* eslint-disable import/order */
// /* eslint-disable prettier/prettier */
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useState } from 'react';
// import { defaultStyles } from '../../constants/Styles';
// import Colors from '../../constants/Colors';
// import { Link, useRouter } from 'expo-router';
// import { useSignUp } from '@clerk/clerk-expo';
// import { StatusBar } from 'expo-status-bar';
// import { useExpoRouter } from 'expo-router/build/global-state/router-store';

// const signUp = () => {
//   const [countryCode, setCountryCode] = useState('+254');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const router = useRouter();
// // const router = useExpoRouter();

//   const { signUp } = useSignUp();

//   const onSignUp = async () => {
//     const fullPhoneNumber = `${countryCode}${phoneNumber}`;

//     try {
//       await signUp!.create({
//         phoneNumber: fullPhoneNumber,
//       });
//       signUp!.preparePhoneNumberVerification();

//       router.push({ pathname: '/verify/[phone]', params: { phoneNumber: fullPhoneNumber } });
//     } catch (error) {
//       console.log('Error Signing up! ', error);
//     }
//   };

//   return (
//     <>
//       <StatusBar style="dark" />
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={90}>
//         <View style={defaultStyles.container}>
//           <Text style={defaultStyles.header}>Let's Get Started!😁</Text>
//           <Text style={defaultStyles.descriptionText}>
//             Enter your phone number. We will send you a confirmation code there
//           </Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={[styles.input, styles.countryCodeInput]}
//               placeholder="Country Code"
//               placeholderTextColor={Colors.gray}
//               value={countryCode}
//             />
//             <TextInput
//               style={[styles.input, styles.phoneNumberInput]}
//               placeholder="Mobile Number"
//               placeholderTextColor={Colors.gray}
//               keyboardType="numeric"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//             />
//           </View>

//           <Link href="/screens/login" replace asChild>
//             <TouchableOpacity>
//               <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
//             </TouchableOpacity>
//           </Link>

//           <View style={{ flex: 1 }} />
//           <TouchableOpacity
//             onPress={onSignUp}
//             style={[
//               defaultStyles.pillButton,
//               phoneNumber !== '' ? styles.enabled : styles.disabled,
//               { marginBottom: 20 },
//             ]}>
//             <Text style={defaultStyles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </>
//   );
// };

// export default signUp;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginVertical: 40,
//     flexDirection: 'row',
//   },
//   input: {
//     backgroundColor: Colors.lightGray,
//     padding: 20,
//     borderRadius: 16,
//     fontSize: 18,
//     marginRight: 10,
//   },
//   phoneNumberInput: {
//     flex: 1, // Take up the remaining space
//   },
//   countryCodeInput: {
//     width: 100, // Fixed width for country code input
//     marginRight: 10,
//   },
//   enabled: {
//     backgroundColor: Colors.primary,
//   },
//   disabled: {
//     backgroundColor: Colors.primaryMuted,
//   },
// });

// // import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
// // import React, { useState } from 'react';
// // import { defaultStyles } from '@/constants/Styles';
// // import Colors from '@/constants/Colors';
// // import { Link, useRouter } from 'expo-router';
// // import { useSignUp } from '@clerk/clerk-expo';
// // import { StatusBar } from 'expo-status-bar';

// // const SignUp = () => {
// //     const [countryCode, setCountryCode] = useState('+254');
// //     const [phoneNumber, setPhoneNumber] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const router = useRouter();
// //     const { signUp } = useSignUp();

// //     const validatePhoneNumber = (number: any) => {
// //         const phoneRegex = /^[0-9]{9,12}$/; // Adjust regex as needed
// //         return phoneRegex.test(number);
// //     };

// //     const onSignUp = async () => {
// //         const fullPhoneNumber = `${countryCode}${phoneNumber}`;

// //         if (!validatePhoneNumber(phoneNumber)) {
// //             Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
// //             return;
// //         }

// //         try {
// //             setLoading(true);
// //             await signUp!.create({
// //                 phoneNumber: fullPhoneNumber,
// //             });
// //             await signUp!.preparePhoneNumberVerification();

// //             router.push({ pathname: '/verify/[phone]', params: { phoneNumber: fullPhoneNumber } });
// //         } catch (error) {
// //             console.error("Error Signing up!", error);
// //             Alert.alert('Sign Up Error', 'An error occurred while signing up. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <>
// //             <StatusBar style='dark' />
// //             <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={90}>
// //                 <View style={defaultStyles.container}>
// //                     <Text style={defaultStyles.header}>Let's Get Started!😁</Text>
// //                     <Text style={defaultStyles.descriptionText}>
// //                         Enter your phone number. We will send you a confirmation code there
// //                     </Text>

// //                     <View style={styles.inputContainer}>
// //                         <TextInput
// //                             style={[styles.input, styles.countryCodeInput]}
// //                             placeholder='Country Code'
// //                             placeholderTextColor={Colors.gray}
// //                             value={countryCode}
// //                             editable={false} // Making it non-editable for now
// //                         />
// //                         <TextInput
// //                             style={[styles.input, styles.phoneNumberInput]}
// //                             placeholder='Mobile Number'
// //                             placeholderTextColor={Colors.gray}
// //                             keyboardType='numeric'
// //                             value={phoneNumber}
// //                             onChangeText={setPhoneNumber}
// //                             accessibilityLabel="Mobile Number"
// //                         />
// //                     </View>

// //                     <Link href={'/screens/login'} replace asChild>
// //                         <TouchableOpacity>
// //                             <Text style={defaultStyles.textLink}>
// //                                 Already have an account? Log in
// //                             </Text>
// //                         </TouchableOpacity>
// //                     </Link>

// //                     <View style={{ flex: 1 }} />
// //                     <TouchableOpacity
// //                         onPress={onSignUp}
// //                         style={[
// //                             defaultStyles.pillButton,
// //                             phoneNumber !== '' ? styles.enabled : styles.disabled,
// //                             { marginBottom: 20 }
// //                         ]}
// //                         disabled={phoneNumber === ''}
// //                         accessibilityLabel="Sign Up"
// //                     >
// //                         {loading ? (
// //                             <ActivityIndicator color='#fff' />
// //                         ) : (
// //                             <Text style={defaultStyles.buttonText}>Sign Up</Text>
// //                         )}
// //                     </TouchableOpacity>
// //                 </View>
// //             </KeyboardAvoidingView>
// //         </>
// //     );
// // };

// // export default SignUp;

// // const styles = StyleSheet.create({
// //     inputContainer: {
// //         marginVertical: 40,
// //         flexDirection: 'row',
// //     },
// //     input: {
// //         backgroundColor: Colors.lightGray,
// //         padding: 20,
// //         borderRadius: 16,
// //         fontSize: 18,
// //         marginRight: 10,
// //     },
// //     phoneNumberInput: {
// //         flex: 1,
// //     },
// //     countryCodeInput: {
// //         width: 100,
// //     },
// //     enabled: {
// //         backgroundColor: Colors.primary,
// //     },
// //     disabled: {
// //         backgroundColor: Colors.primaryMuted,
// //     }
// // });

// // // import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// // // import React, { useState } from 'react'
// // // import { defaultStyles } from '@/constants/Styles';
// // // import Colors from '@/constants/Colors';
// // // import { Link, useRouter } from 'expo-router';
// // // import { useSignUp } from '@clerk/clerk-expo';
// // // import { StatusBar } from 'expo-status-bar';

// // // const signUp = () => {
// // //     const [countryCode, setCountryCode] = useState('+254');
// // //     const [phoneNumber, setPhoneNumber] = useState('');
// // //     const router = useRouter();
// // //     const { signUp } = useSignUp();

// // //     const onSignUp = async () => {
// // //         const fullPhoneNumber = `${countryCode}${phoneNumber}`;

// // //         try {
// // //             await signUp!.create({
// // //                 phoneNumber: fullPhoneNumber,
// // //             });
// // //             signUp!.preparePhoneNumberVerification();

// // //             router.push({ pathname: '/verify/[phone]', params: { phoneNumber: fullPhoneNumber } })
// // //         } catch (error) {
// // //             console.log("Error Signing up! ", error);
// // //         }
// // //     };

// // //     return (
// // //         <>
// // //             <StatusBar style='dark' />
// // //             <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'
// // //                 keyboardVerticalOffset={90}>
// // //                 <View style={defaultStyles.container}>
// // //                     <Text style={defaultStyles.header}>Let's Get Started!😁</Text>
// // //                     <Text style={defaultStyles.descriptionText}>
// // //                         Enter your phone number. We will send you a confirmation code there
// // //                     </Text>

// // //                     <View style={styles.inputContainer}>
// // //                         <TextInput
// // //                             style={[styles.input, styles.countryCodeInput]}
// // //                             placeholder='Country Code'
// // //                             placeholderTextColor={Colors.gray}
// // //                             value={countryCode}
// // //                         />
// // //                         <TextInput
// // //                             style={[styles.input, styles.phoneNumberInput]}
// // //                             placeholder='Mobile Number'
// // //                             placeholderTextColor={Colors.gray}
// // //                             keyboardType='numeric'
// // //                             value={phoneNumber}
// // //                             onChangeText={setPhoneNumber} />
// // //                     </View>

// // //                     <Link href={'/screens/login'} replace asChild>
// // //                         <TouchableOpacity>
// // //                             <Text style={defaultStyles.textLink}>
// // //                                 Already have an account? Log in
// // //                             </Text>
// // //                         </TouchableOpacity>
// // //                     </Link>

// // //                     <View style={{ flex: 1 }} />
// // //                     <TouchableOpacity
// // //                         onPress={onSignUp}
// // //                         style={[
// // //                             defaultStyles.pillButton,
// // //                             phoneNumber !== '' ? styles.enabled : styles.disabled,
// // //                             { marginBottom: 20 }
// // //                         ]}>
// // //                         <Text style={defaultStyles.buttonText}>Sign Up</Text>
// // //                     </TouchableOpacity>
// // //                 </View>
// // //             </KeyboardAvoidingView>
// // //         </>
// // //     )
// // // }

// // // export default signUp

// // // const styles = StyleSheet.create({
// // //     inputContainer: {
// // //         marginVertical: 40,
// // //         flexDirection: 'row',
// // //     },
// // //     input: {
// // //         backgroundColor: Colors.lightGray,
// // //         padding: 20,
// // //         borderRadius: 16,
// // //         fontSize: 18,
// // //         marginRight: 10,
// // //     },
// // //     phoneNumberInput: {
// // //         flex: 1, // Take up the remaining space
// // //     },
// // //     countryCodeInput: {
// // //         width: 100, // Fixed width for country code input
// // //         marginRight: 10,
// // //     },
// // //     enabled: {
// // //         backgroundColor: Colors.primary,
// // //     },
// // //     disabled: {
// // //         backgroundColor: Colors.primaryMuted,
// // //     }
// // // })
