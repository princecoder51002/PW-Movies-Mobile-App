import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Card from './Card';


class List extends React.PureComponent {
    
    render() {
        const {title, content} = this.props;
        return (

            <View style={styles.list}>

            <View>
                   <Text style={styles.text}>{title}</Text>
            </View>

            <View>
                <FlatList data={content} horizontal={true} renderItem={({item}) => <Card item={item} />}>
                </FlatList>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    list: {
        marginTop: 30,
    },

   text: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingBottom: 20,
   }
})

export default List;