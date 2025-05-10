import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { globalStyles } from '@/constants/styles';

interface PrimaryButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={globalStyles.tileButton} onPress={onPress}>
      <Text style={globalStyles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
