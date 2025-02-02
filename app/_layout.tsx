import * as SecureStore from 'expo-secure-store';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import SplashScreenView from './screens/SplashScreenView';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SupabaseProvider } from '../context/SupabaseContext';
import { Provider } from 'react-redux';
import { store } from './context/store';
import 'react-native-gesture-handler';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment variables');
}

// Enhanced token cache with secure storage
const tokenCache = {
  async getToken(key: string) {
    try {
      const token = await SecureStore.getItemAsync(key);
      console.log(`Token retrieved for key: ${key} 🔐`);
      return token;
    } catch (err) {
      console.error('Failed to get token:', err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Token saved for key: ${key} 💾`);
    } catch (err) {
      console.error('Failed to save token:', err);
    }
  },
};

export default function RootLayout() {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <ClerkLoaded>
          <ActionSheetProvider>
            <GestureHandlerRootView style={styles.container}>
              <StatusBar style="light" />
              {isSplash ? <SplashScreenView /> : <NavigationRoot />}
            </GestureHandlerRootView>
          </ActionSheetProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
}

function NavigationRoot() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)';
    console.log('Auth Status:', { isSignedIn, inAuthGroup, segments });

    if (isSignedIn && !inAuthGroup) {
      router.push('/(authenticated)/(tabs)/Home/Home');
    } else if (!isSignedIn && inAuthGroup) {
      router.replace('/');
    }
  }, [isSignedIn, isLoaded, segments]);

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SupabaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          <Stack
            screenOptions={{
              headerStyle: styles.headerStyle,
              headerTintColor: Colors.primary,
            }}
          >
            {/* Public Routes */}
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="screens/signUp"
              options={{
                headerTitle: 'Sign Up',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="screens/login"
              options={{
                headerTitle: 'Login',
                headerShown: true,
                headerRight: () => (
                  <Link href="/screens/help" asChild>
                    <TouchableOpacity style={styles.helpButton}>
                      <Ionicons
                        name="help-circle-outline"
                        size={34}
                        color={colorScheme === 'dark' ? Colors.white : Colors.black}
                      />
                    </TouchableOpacity>
                  </Link>
                ),
              }}
            />

            {/* Modal Screens */}
            <Stack.Screen
              name="modal"
              options={{
                title: 'Modal',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="screens/help"
              options={{
                title: 'Help',
                presentation: 'modal',
              }}
            />

            {/* Auth Verification */}
            <Stack.Screen name="verify/[phone]" options={{ headerShown: false }} />

            {/* Protected Routes */}
            <Stack.Screen
              name="(authenticated)/(tabs)"
              options={{ headerShown: false }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SupabaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  headerStyle: {
    backgroundColor: Colors.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  helpButton: {
    padding: 8,
    marginRight: 8,
  },
});





// import * as SecureStore from 'expo-secure-store';
// import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
// import { Ionicons } from '@expo/vector-icons';
// import { Link, Stack, useRouter, useSegments } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { 
//   ActivityIndicator, 
//   SafeAreaView, 
//   TouchableOpacity, 
//   View,
//   StyleSheet 
// } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { useEffect, useState, useRef } from 'react';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useColorScheme } from '../hooks/useColorScheme';
// import Colors from '../constants/Colors';
// import SplashScreenView from './screens/SplashScreenView';
// import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// import { SupabaseProvider } from '../context/SupabaseContext';
// import { Provider } from 'react-redux';
// import { store } from './context/store';
// // Only import react-native-gesture-handler on native platforms
// import 'react-native-gesture-handler';

// const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// if (!CLERK_PUBLISHABLE_KEY) {
//   throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment variables');
// }

// // Enhanced token cache with secure storage
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       const token = await SecureStore.getItemAsync(key);
//       console.log(`Token retrieved for key: ${key} 🔐`);
//       return token;
//     } catch (err) {
//       console.error('Failed to get token:', err);
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       await SecureStore.setItemAsync(key, value);
//       console.log(`Token saved for key: ${key} 💾`);
//     } catch (err) {
//       console.error('Failed to save token:', err);
//     }
//   }
// };

// export default function RootLayout() {
//   const [isSplash, setIsSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsSplash(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <Provider store={store}>
//       <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
//         <ClerkLoaded>
//           <ActionSheetProvider>
//             <GestureHandlerRootView style={styles.container}>
//               <StatusBar style="light" />
//               {isSplash ? <SplashScreenView /> : <NavigationRoot />}
//             </GestureHandlerRootView>
//           </ActionSheetProvider>
//         </ClerkLoaded>
//       </ClerkProvider>
//     </Provider>
//   );
// }

// function NavigationRoot() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn } = useAuth();
//   const segments = useSegments();
//   const colorScheme = useColorScheme();
//   const navigationAttempted = useRef(false);
//   const [isInitialAuthCheck, setIsInitialAuthCheck] = useState(true);

//   useEffect(() => {
//     console.log("isSignedIn: >", isSignedIn);
//     if (!isLoaded) return;

//     const inAuthGroup = segments[0] === '(authenticated)';
//     console.log('Auth Status:', { isSignedIn, inAuthGroup, segments });

//     const handleNavigation = async () => {
//       try {
//         if (isSignedIn) {
//           console.log('User is signed in, navigating to home...');
//           await router.push('/(authenticated)/(tabs)/Home/Home');
//         } else if (!isSignedIn && inAuthGroup) {
//           console.log('User is not signed in, navigating to sign-in...');
//           await router.replace('/');
//         }
//       } catch (err) {
//         console.error('Navigation failed:', err);
//       }
//     };

//     if (isInitialAuthCheck) { 
//       setIsInitialAuthCheck(false);
//       handleNavigation();
//       return;
//     }

//     if (!navigationAttempted.current) {
//       navigationAttempted.current = true;
//       handleNavigation();
//     }

//     return () => {
//       navigationAttempted.current = false;
//     };
//   }, [isSignedIn, isLoaded, segments, isInitialAuthCheck]);

//   if (!isLoaded) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SupabaseProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <GestureHandlerRootView>
//         <Stack screenOptions={{
//           headerStyle: styles.headerStyle,
//           headerTintColor: Colors.primary,
//         }}>
//           {/* Public Routes */}
//           <Stack.Screen 
//             name="(drawer)" 
//             options={{ headerShown: false }} 
//           />
//           <Stack.Screen 
//             name="index"
//             options={{ headerShown: false }} 
//           />
//           <Stack.Screen
//             name="screens/signUp"
//             options={{
//               headerTitle: "Sign Up",
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="screens/login"
//             options={{
//               headerTitle: "Login",
//               headerShown: true,
//               headerRight: () => (
//                 <Link href="/screens/help" asChild>
//                   <TouchableOpacity style={styles.helpButton}>
//                     <Ionicons
//                       name="help-circle-outline"
//                       size={34}
//                       color={colorScheme === 'dark' ? Colors.white : Colors.black}
//                     />
//                   </TouchableOpacity>
//                 </Link>
//               ),
//             }}
//           />
          
//           {/* Modal Screens */}
//           <Stack.Screen
//             name="modal"
//             options={{
//               title: "Modal",
//               presentation: "modal",
//             }}
//           />
//           <Stack.Screen
//             name="screens/help"
//             options={{
//               title: "Help",
//               presentation: "modal",
//             }}
//           />
          
//           {/* Auth Verification */}
//           <Stack.Screen
//             name="verify/[phone]"
//             options={{ headerShown: false }}
//           />
          
//           {/* Protected Routes */}
//           <Stack.Screen
//             name="(authenticated)/(tabs)"
//             options={{ headerShown: false }}
//           />
//         </Stack>
//         </GestureHandlerRootView>
//       </ThemeProvider>
//     </SupabaseProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.background,
//   },
//   headerStyle: {
//     backgroundColor: Colors.background,
//     elevation: 0,
//     shadowOpacity: 0,
//   },
//   helpButton: {
//     padding: 8,
//     marginRight: 8,
//   },
// });



// // import * as SecureStore from 'expo-secure-store';
// // import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
// // import { Ionicons } from '@expo/vector-icons';
// // import { Link, Stack, useRouter, useSegments } from 'expo-router';
// // import { StatusBar } from 'expo-status-bar';
// // import { 
// //   ActivityIndicator, 
// //   SafeAreaView, 
// //   TouchableOpacity, 
// //   View,
// //   StyleSheet 
// // } from 'react-native';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { useEffect, useState, useRef } from 'react';
// // import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// // import { useColorScheme } from '.././hooks/useColorScheme';
// // import Colors from '../constants/Colors';
// // import SplashScreenView from './screens/SplashScreenView';
// // import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// // import { SupabaseProvider } from '../context/SupabaseContext';
// // import { Provider } from 'react-redux';
// // import { store } from './context/store';

// // const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// // if (!CLERK_PUBLISHABLE_KEY) {
// //   throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment variables');
// // }

// // // Enhanced token cache with secure storage
// // const tokenCache = {
// //   async getToken(key: string) {
// //     try {
// //       const token = await SecureStore.getItemAsync(key);
// //       console.log(`Token retrieved for key: ${key} 🔐`);
// //       return token;
// //     } catch (err) {
// //       console.error('Failed to get token:', err);
// //       return null;
// //     }
// //   },
// //   async saveToken(key: string, value: string) {
// //     try {
// //       await SecureStore.setItemAsync(key, value);
// //       console.log(`Token saved for key: ${key} 💾`);
// //     } catch (err) {
// //       console.error('Failed to save token:', err);
// //     }
// //   }
// // };

// // export default function RootLayout() {
// //   const [isSplash, setIsSplash] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsSplash(false), 3000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   return (
// //     <Provider store={store}>
// //       <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
// //         <ClerkLoaded>
// //           <ActionSheetProvider>
// //             <GestureHandlerRootView style={styles.container}>
// //               <StatusBar style="light" />
// //               {isSplash ? <SplashScreenView /> : <NavigationRoot />}
// //             </GestureHandlerRootView>
// //           </ActionSheetProvider>
// //         </ClerkLoaded>
// //       </ClerkProvider>
// //     </Provider>
// //   );
// // }

// // function NavigationRoot() {
// //   const router = useRouter();
// //   const { isLoaded, isSignedIn } = useAuth();
// //   const segments = useSegments();
// //   const colorScheme = useColorScheme();
// //   const navigationAttempted = useRef(false);
// //   const [isInitialAuthCheck, setIsInitialAuthCheck] = useState(true);

// //   useEffect(() => {
// //     if (!isLoaded) return;

// //     const inAuthGroup = segments[0] === '(authenticated)';
// //     console.log('Auth Status:', { isSignedIn, inAuthGroup, segments });

// //     const handleNavigation = async () => {
// //       try {
// //         if (isSignedIn) {
// //           console.log('User is signed in, navigating to home...');
// //           await router.replace('/(authenticated)/(tabs)/Home');
// //         } else if (!isSignedIn && inAuthGroup) {
// //           console.log('User is not signed in, navigating to sign-in...');
// //           await router.replace('/');
// //         }
// //       } catch (err) {
// //         console.error('Navigation failed:', err);
// //       }
// //     };

// //     if (isInitialAuthCheck) {
// //       setIsInitialAuthCheck(false);
// //       handleNavigation();
// //       return;
// //     }

// //     if (!navigationAttempted.current) {
// //       navigationAttempted.current = true;
// //       handleNavigation();
// //     }

// //     return () => {
// //       navigationAttempted.current = false;
// //     };
// //   }, [isSignedIn, isLoaded, segments, isInitialAuthCheck]);

// //   if (!isLoaded) {
// //     return (
// //       <SafeAreaView style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color={Colors.primary} />
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SupabaseProvider>
// //       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
// //         <Stack screenOptions={{
// //           headerStyle: styles.headerStyle,
// //           headerTintColor: Colors.primary,
// //         }}>
// //           {/* Public Routes */}
// //           <Stack.Screen 
// //             name="(drawer)" 
// //             options={{ headerShown: false }} 
// //           />
// //           <Stack.Screen 
// //             name="index" 
// //             options={{ headerShown: false }} 
// //           />
// //           <Stack.Screen
// //             name="screens/signUp"
// //             options={{
// //               headerTitle: "Sign Up",
// //               headerShown: true,
// //             }}
// //           />
// //           <Stack.Screen
// //             name="screens/login"
// //             options={{
// //               headerTitle: "Login",
// //               headerShown: true,
// //               headerRight: () => (
// //                 <Link href="/screens/help" asChild>
// //                   <TouchableOpacity style={styles.helpButton}>
// //                     <Ionicons
// //                       name="help-circle-outline"
// //                       size={34}
// //                       color={colorScheme === 'dark' ? Colors.white : Colors.black}
// //                     />
// //                   </TouchableOpacity>
// //                 </Link>
// //               ),
// //             }}
// //           />
          
// //           {/* Modal Screens */}
// //           <Stack.Screen
// //             name="modal"
// //             options={{
// //               title: "Modal",
// //               presentation: "modal",
// //             }}
// //           />
// //           <Stack.Screen
// //             name="screens/help"
// //             options={{
// //               title: "Help",
// //               presentation: "modal",
// //             }}
// //           />
          
// //           {/* Auth Verification */}
// //           <Stack.Screen
// //             name="verify/[phone]"
// //             options={{ headerShown: false }}
// //           />
          
// //           {/* Protected Routes */}
// //           <Stack.Screen
// //             name="(authenticated)/(tabs)"
// //             options={{ headerShown: false }}
// //           />
// //         </Stack>
// //       </ThemeProvider>
// //     </SupabaseProvider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: Colors.background,
// //   },
// //   headerStyle: {
// //     backgroundColor: Colors.background,
// //     elevation: 0,
// //     shadowOpacity: 0,
// //   },
// //   helpButton: {
// //     padding: 8,
// //     marginRight: 8,
// //   },
// // });



// // // import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
// // // import { Stack } from 'expo-router';
// // // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // // import { tokenCache } from '~/cache';
// // // import * as DevClient from 'expo-dev-client';

// // // export const unstable_settings = {
// // //   // Ensure that reloading on `/modal` keeps a back button present.
// // //   initialRouteName: '(drawer)',
// // // };

// // // const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// // // if (!publishableKey) {
// // //   throw new Error(
// // //     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
// // //   );
// // // }
// // // export default function RootLayout() {
// // //   return (
// // //     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
// // //       <ClerkLoaded>
// // //         <GestureHandlerRootView style={{ flex: 1 }}>
// // //           <Stack>
// // //             <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
// // //             <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
// // //             <Stack.Screen name="screens/signUp" options={{ 
// // //               headerShown: true,
// // //               headerTitle: "Sign Up",
// // //              }} />
// // //             <Stack.Screen name="screens/login" options={{ headerShown: false, presentation: 'modal' }} />
// // //             <Stack.Screen name="index" options={{ headerShown: false, presentation: 'modal' }}/>
// // //           </Stack>
// // //         </GestureHandlerRootView>
// // //       </ClerkLoaded>
// // //     </ClerkProvider>
// // //   );
// // // }
