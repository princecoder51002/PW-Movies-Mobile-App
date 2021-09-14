import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/colors';

class PlayButton extends React.PureComponent {
    
    render() {
        const {handlePress} = this.props;
        return (
            <Pressable onPress={() => handlePress()} style={styles.button}>
                 <Icon name={'caret-forward-outline'} size={45} color={Colors.white} />
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
  button: {
      alignContent: 'center',
      borderRadius: 50,
      width: 65,
      padding: 10,
      backgroundColor: Colors.primary,
  }
})

export default PlayButton;