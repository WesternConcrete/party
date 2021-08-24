import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class DeleteInput extends React.Component {
  render() {
    return(
      <TouchableOpacity style={{paddingRight: 12}} onPress={this.props.function}>
        <Ionicons
          name="close-circle-outline"
          size={18}
          color="black"
        />
      </TouchableOpacity>
    )
  }
}
