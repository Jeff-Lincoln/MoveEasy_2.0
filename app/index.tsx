import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAssets } from 'expo-asset';
// import { ResizeMode, Video } from 'expo-video';


import { ResizeMode, Video } from 'expo-av';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import AuthModal from './screens/AuthModal';
import { ModalType } from '../types/enums';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Index = () => {
  const [assets] = useAssets([require('../assets/videos/intro.mp4')]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const showModal = (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* Video Background */}
        {assets && (
          <Video
            source={{ uri: assets[0].uri }}
            style={styles.video}
            shouldPlay
            isLooping
            resizeMode={ResizeMode.COVER}
            isMuted
          />
        )}

        {/* Content Overlay */}
        <View style={styles.overlay}>
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                Simplify Your{'\n'}
                <Text style={styles.highlightedText}>Relocation</Text>{'\n'}
                Experience!
              </Text>
              <Text style={styles.subheaderText}>
                Start your journey to a new home today
              </Text>
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.loginButton]}
                  onPress={() => showModal(ModalType.Login)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.signUpButton]}
                  onPress={() => showModal(ModalType.SignUp)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.description}>
                By Signing Up, you agree to the{' '}
                <Text style={styles.link} onPress={() => { /* open user notice link */ }}>
                  User Notice
                </Text>{' '}
                and{' '}
                <Text style={styles.link} onPress={() => { /* open privacy policy link */ }}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        enableOverDrag={true}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
      >
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: width * 0.05,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.05,
    alignItems: 'center',
  },
  headerText: {
    fontSize: width * 0.09,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    lineHeight: width * 0.11,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  highlightedText: {
    color: '#d8632c',
  },
  subheaderText: {
    fontSize: width * 0.045,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: height * 0.02,
    opacity: 0.9,
  },
  bottomSection: {
    marginBottom: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: width * 0.04,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.018,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  loginButton: {
    backgroundColor: '#d8632c',
  },
  signUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: '#d8632c',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  signUpButtonText: {
    color: '#d8632c',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  description: {
    fontSize: width * 0.035,
    textAlign: 'center',
    color: '#e0e0e0',
    marginHorizontal: width * 0.1,
    marginTop: height * 0.01,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { useAssets } from 'expo-asset'
// import { ResizeMode, Video } from 'expo-av';
// import BottomLoginSheet from '~/components/BottomLoginSheet';


// const Index = () => {

//   const [assets] = useAssets([require('../assets/videos/intro.mp4')])
//   return (
//     <View style={styles.container}>
//       {assets && 
//       ( <Video source={{ uri: assets[0].uri }} style={styles.video} shouldPlay isLooping 
//         resizeMode={ResizeMode.COVER} 
//         isMuted/>)}

//         <View style={{ marginTop: 10, padding: 20}}>
//           <Text style={styles.header}>Welcome to the app!!</Text>
//         </View>

//           <View style={styles.buttons}>
//             <TouchableOpacity>
//               <Text style={{ color: 'blue', fontSize: 20, fontWeight: 'bold' }}>Login</Text>
//             </TouchableOpacity>
//           </View>
//           {/* <BottomLoginSheet /> */}
//     </View>
//   )
// }

// export default Index

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     // backgroundColor: '#fff',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//   },
//   header: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: 'gray',
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 20,
//     marginBottom: 60,
//   }
// })



// // /* eslint-disable import/order */
// // /* eslint-disable prettier/prettier */
// // import {
// //   ImageBackground,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Dimensions,
// //   Platform,
// //   Animated
// // } from 'react-native';
// // import React, { useMemo, useRef, useState, useEffect } from 'react';
// // import { StatusBar } from 'expo-status-bar';
// // import image from '../assets/videos/homeVideo.gif';
// // import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// // import AuthModal from './screens/AuthModal';
// // import { ModalType } from '../types/enums';

// // const { width, height } = Dimensions.get('window');

// // const Index = () => {
// //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
// //   const snapPoints = useMemo(() => ['30%'], []);
// //   const [authType, setAuthType] = useState<ModalType | null>(null);
// //   const fadeAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.timing(fadeAnim, {
// //       toValue: 1,
// //       duration: 1000,
// //       useNativeDriver: true,
// //     }).start();
// //   }, []);

// //   const showModal = (type: ModalType) => {
// //     setAuthType(type);
// //     bottomSheetModalRef.current?.present();
// //   };

// //   return (
// //     <BottomSheetModalProvider>
// //       <View style={styles.container}>
// //         <StatusBar style="light" />
// //         <ImageBackground
// //           source={image}
// //           style={styles.image}
// //           blurRadius={3}
// //         >
// //           <View style={styles.overlay}>
// //             <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
// //               <View style={styles.headerContainer}>
// //                 <Text style={styles.headerText}>
// //                   Simplify Your{'\n'}
// //                   <Text style={styles.highlightedText}>Relocation</Text>{'\n'}
// //                   Experience!
// //                 </Text>
// //                 <Text style={styles.subheaderText}>
// //                   Start your journey to a new home today
// //                 </Text>
// //               </View>

// //               <View style={styles.bottomSection}>
// //                 <View style={styles.buttonContainer}>
// //                   <TouchableOpacity
// //                     style={[styles.button, styles.loginButton]}
// //                     onPress={() => showModal(ModalType.Login)}
// //                     activeOpacity={0.8}
// //                   >
// //                     <Text style={styles.loginButtonText}>Login</Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     style={[styles.button, styles.signUpButton]}
// //                     onPress={() => showModal(ModalType.SignUp)}
// //                     activeOpacity={0.8}
// //                   >
// //                     <Text style={styles.signUpButtonText}>Sign Up</Text>
// //                   </TouchableOpacity>
// //                 </View>

// //                 <Text style={styles.description}>
// //                   By Signing Up, you agree to the{' '}
// //                   <Text
// //                     style={styles.link}
// //                     onPress={() => { /* open user notice link */ }}
// //                   >
// //                     User Notice
// //                   </Text> and{' '}
// //                   <Text
// //                     style={styles.link}
// //                     onPress={() => { /* open privacy policy link */ }}
// //                   >
// //                     Privacy Policy
// //                   </Text>
// //                 </Text>
// //               </View>
// //             </Animated.View>
// //           </View>
// //         </ImageBackground>
// //       </View>

// //       <BottomSheetModal
// //         ref={bottomSheetModalRef}
// //         index={0}
// //         snapPoints={snapPoints}
// //         handleComponent={null}
// //         enableOverDrag
// //         enablePanDownToClose
// //         backdropComponent={(props) => (
// //           <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
// //         )}
// //       >
// //         <AuthModal authType={authType} />
// //       </BottomSheetModal>
// //     </BottomSheetModalProvider>
// //   );
// // };

// // export default Index;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //     // backgroundColor: '#fff',

// //   },
// //   image: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   overlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0, 0, 0, 0.45)',
// //   },
// //   content: {
// //     flex: 1,
// //     justifyContent: 'space-between',
// //     padding: width * 0.05,
// //   },
// //   headerContainer: {
// //     marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.05,
// //     alignItems: 'center',
// //   },
// //   headerText: {
// //     fontSize: width * 0.09,
// //     fontWeight: '900',
// //     color: '#fff',
// //     textAlign: 'center',
// //     lineHeight: width * 0.11,
// //     textShadowColor: 'rgba(0, 0, 0, 0.3)',
// //     textShadowOffset: { width: 0, height: 2 },
// //     textShadowRadius: 4,
// //   },
// //   highlightedText: {
// //     color: '#d8632c',
// //   },
// //   subheaderText: {
// //     fontSize: width * 0.045,
// //     color: '#e0e0e0',
// //     textAlign: 'center',
// //     marginTop: height * 0.02,
// //     opacity: 0.9,
// //   },
// //   bottomSection: {
// //     marginBottom: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     gap: width * 0.04,
// //     marginBottom: height * 0.02,
// //     paddingHorizontal: width * 0.02,
// //   },
// //   button: {
// //     flex: 1,
// //     paddingVertical: height * 0.018,
// //     borderRadius: 30,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3,
// //     },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 4.5,
// //     elevation: 6,
// //   },
// //   loginButton: {
// //     backgroundColor: '#d8632c',
// //   },
// //   signUpButton: {
// //     backgroundColor: 'rgba(255, 255, 255, 0.95)',
// //     borderWidth: 1,
// //     borderColor: '#d8632c',
// //   },
// //   loginButtonText: {
// //     color: '#fff',
// //     fontSize: width * 0.045,
// //     fontWeight: '600',
// //   },
// //   signUpButtonText: {
// //     color: '#d8632c',
// //     fontSize: width * 0.045,
// //     fontWeight: '600',
// //   },
// //   description: {
// //     fontSize: width * 0.035,
// //     textAlign: 'center',
// //     color: '#e0e0e0',
// //     marginHorizontal: width * 0.1,
// //     marginTop: height * 0.01,
// //   },
// //   link: {
// //     color: 'black',
// //     textDecorationLine: 'underline',
// //     fontWeight: '500',
// //   },
// //   backdrop: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: '#000',
// //   },
// // });