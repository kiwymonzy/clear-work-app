// components/Screens/SettingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import AuthRepository from '../Repositories/AuthRepository';
import BusinessConfig from '../Models/BusinessConfig';
import { COLORS } from '../Utls';

const SettingScreen = () => {
  const [businessConfig, setBusinessConfig] = useState(null); // Change to null or a specific type if using TypeScript
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBusinessConfig = async () => {
      try {
        const config = await AuthRepository.getBusinessConfig();
        setBusinessConfig(config);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessConfig();
  }, [setBusinessConfig, setError]); // Include state setters in the dependency array

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!businessConfig) {
    return <Text>No configuration data available</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.khak,
      }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Business Configuration</Text>
      <Text style={styles.sectionTitle}>Business Name: {businessConfig.content.business_name}</Text>
      <Text style={styles.sectionTitle}>Business Address: {businessConfig.content.business_address}</Text>
      <Text style={styles.sectionTitle}>Business Phone: {businessConfig.content.business_phone}</Text>
      <Text style={styles.sectionTitle}>Base URL: {businessConfig.content.base_url}</Text>
      <Text style={styles.sectionTitle}>Currency Code: {businessConfig.content.currency_code}</Text>
      <Text style={styles.sectionTitle}>Currency Symbol: {businessConfig.content.currency_symbol}</Text>
      <Text style={styles.sectionTitle}>Footer Text: {businessConfig.content.footer_text}</Text>
      <Text style={styles.sectionTitle}>Admin: {businessConfig.content.admin_details.first_name} {businessConfig.content.admin_details.last_name}</Text>
      <Text style={styles.sectionTitle}>Social Media:</Text>
      {businessConfig.content.social_media.map((social) => (
        <Text key={social.id}>{social.media}: {social.link}</Text>
      ))}
    </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});

export default SettingScreen;
