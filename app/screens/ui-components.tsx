import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export const CardHeader = ({ children, style }: CardHeaderProps) => {
  return <View style={[styles.cardHeader, style]}>{children}</View>;
};

export const CardTitle = ({ children, style }: CardTitleProps) => {
  return <Text style={[styles.cardTitle, style]}>{children}</Text>;
};

export const CardDescription = ({ children, style }: CardDescriptionProps) => {
  return <Text style={[styles.cardDescription, style]}>{children}</Text>;
};

export const CardContent = ({ children, style }: CardContentProps) => {
  return <View style={[styles.cardContent, style]}>{children}</View>;
};

// Default export
const UiComponents = {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
};

export default UiComponents;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 2,
    marginVertical: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  cardDescription: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});



// import React from 'react';
// import { StyleSheet, View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';

// interface CardProps {
//   children: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
// }

// interface CardHeaderProps {
//   children: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
// }

// interface CardTitleProps {
//   children: React.ReactNode;
//   style?: StyleProp<TextStyle>;
// }

// interface CardDescriptionProps {
//   children: React.ReactNode;
//   style?: StyleProp<TextStyle>;
// }

// interface CardContentProps {
//   children: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
// }

// export const Card = ({ children, style }: CardProps) => {
//   return <View style={[styles.card, style]}>{children}</View>;
// };

// export const CardHeader = ({ children, style }: CardHeaderProps) => {
//   return <View style={[styles.cardHeader, style]}>{children}</View>;
// };

// export const CardTitle = ({ children, style }: CardTitleProps) => {
//   return <Text style={[styles.cardTitle, style]}>{children}</Text>;
// };

// export const CardDescription = ({ children, style }: CardDescriptionProps) => {
//   return <Text style={[styles.cardDescription, style]}>{children}</Text>;
// };

// export const CardContent = ({ children, style }: CardContentProps) => {
//   return <View style={[styles.cardContent, style]}>{children}</View>;
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: 'rgba(0, 0, 0, 0.1)',
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     shadowOpacity: 1,
//     elevation: 2,
//     marginVertical: 16,
//     overflow: 'hidden', // Ensures content doesn't overflow rounded corners
//   },
//   cardHeader: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#374151',
//   },
//   cardDescription: {
//     fontSize: 16,
//     color: '#4B5563',
//     marginTop: 4, // Add some spacing between title and description
//   },
//   cardContent: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
// });




// // import React from 'react';
// // import { StyleSheet, View, Text } from 'react-native';

// // export const Card: React.FC = ({ children }) => {
// //   return <View style={styles.card}>{children}</View>;
// // };

// // export const CardHeader: React.FC = ({ children }) => {
// //   return <View style={styles.cardHeader}>{children}</View>;
// // };

// // export const CardTitle: React.FC = ({ children }) => {
// //   return <Text style={styles.cardTitle}>{children}</Text>;
// // };

// // export const CardDescription: React.FC = ({ children, style }) => {
// //   return <Text style={[styles.cardDescription, style]}>{children}</Text>;
// // };

// // export const CardContent: React.FC = ({ children }) => {
// //   return <View style={styles.cardContent}>{children}</View>;
// // };

// // const styles = StyleSheet.create({
// //   card: {
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     shadowColor: 'rgba(0, 0, 0, 0.1)',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 4,
// //     shadowOpacity: 1,
// //     elevation: 2,
// //     marginVertical: 16,
// //   },
// //   cardHeader: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#E5E7EB',
// //   },
// //   cardTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#374151',
// //   },
// //   cardDescription: {
// //     fontSize: 16,
// //     color: '#4B5563',
// //   },
// //   cardContent: {
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //   },
// // });