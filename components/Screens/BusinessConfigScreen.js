import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useBusinessConfig } from '../../context/BusinessConfigContext';
import { COLORS } from '../Utls';

const BusinessConfigScreen = () => {
  const { businessConfig } = useBusinessConfig();

  if (!businessConfig) {
    return (
      <View style={styles.container}>
        <Text>No configuration data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Business Configuration</Text>
        <Text style={styles.sectionTitle}>
          Business Name: {businessConfig.content.business_name}
        </Text>
        <Text style={styles.sectionTitle}>
          Business Address: {businessConfig.content.business_address}
        </Text>
        <Text style={styles.sectionTitle}>
          Business Phone: {businessConfig.content.business_phone}
        </Text>
        <Text style={styles.sectionTitle}>
          Base URL: {businessConfig.content.base_url}
        </Text>
        <Text style={styles.sectionTitle}>
          Currency Code: {businessConfig.content.currency_code}
        </Text>
        <Text style={styles.sectionTitle}>
          Currency Symbol: {businessConfig.content.currency_symbol}
        </Text>
        <Text style={styles.sectionTitle}>
          Footer Text: {businessConfig.content.footer_text}
        </Text>
        <Text style={styles.sectionTitle}>
          Admin: {businessConfig.content.admin_details.first_name}{' '}
          {businessConfig.content.admin_details.last_name}
        </Text>
        <Text style={styles.sectionTitle}>Social Media:</Text>
        {businessConfig.content.social_media.map((social) => (
          <Text key={social.id}>
            {social.media}: {social.link}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical:30,
    backgroundColor: COLORS.khak,
  },
    header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
});

export default BusinessConfigScreen;
