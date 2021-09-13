import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Error extends React.PureComponent {
    render() {

        const {errorText1, errorText2} = this.props;
        return (
            <View style={styles.container}>
               <Text style={styles.text}>
                   {errorText1}
               </Text>
               <Text style={styles.text}>
                   {errorText2}
               </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    text: {
        color: 'red',
        fontWeight: 'bold',
    }
})

export default Error;