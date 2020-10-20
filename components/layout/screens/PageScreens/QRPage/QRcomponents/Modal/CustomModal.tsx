import React from 'react';
import { Modal, View, Text, Image, Button } from 'react-native';
import { styles } from './styles';

const CustomModal = (movies: any, { onPress, title }) => {
    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={(typeof movies.selected.Title != "undefined")}
        >
            <View style={styles.ContainerPopup}>
                <Text style={styles.titlePopup}>
                    {movies.selected.Title}
                </Text>
                <Image
                    source={{ uri: movies.selected.Poster }}
                    style={styles.ImagePopup}
                />
                <Text style={styles.ReleaseYearPopup}>
                    Release Year: {movies.selected.Year}
                </Text>

                <Text style={styles.plotPopup}>
                    Description: {movies.selected.Plot}
                </Text>

                <Button
                    onPress={onPress}
                    title={title}
                >

                </Button>
            </View>
        </Modal>
    )
}

export default CustomModal;

// onPress={() => setMovieName(prevState => {
//     return { ...prevState, selected: {} }
// })} title="Close">