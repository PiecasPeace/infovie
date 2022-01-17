import React from 'react';
import {View, StyleSheet} from 'react-native';
//import styles from './styles'

interface MovieInfoProps {}

export const MovieInfo: React.FC<MovieInfoProps> = ({}:MovieInfoProps) => {
return(
<View>
<View>
</View>
</View>
);
};
export const styles = StyleSheet.create({
favoritesContainer: {
flex: 1,
backgroundColor: '#010101',
},
 collectionItems: {
flex: 1,
 flexDirection: 'column',
}
});