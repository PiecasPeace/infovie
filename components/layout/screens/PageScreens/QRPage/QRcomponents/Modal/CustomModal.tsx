import React from 'react';
import { Modal, View, Text, Image, Button } from 'react-native';
import { IMovieIDItem } from '../../utils/interface/IDInterface';
import { getImageApi } from '../../../../../../utils/Image';
import { styles } from './styles';

interface ICustomModalProps {
    onPress: () => void;
    item: IMovieIDItem;
    visible: boolean;
}
//moviedetailsdialog
const CustomModal = ({ item, onPress, visible }: ICustomModalProps) => {
    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={visible}
        >
            <View style={styles.ContainerPopup}>
                <Text style={styles.titlePopup}>
                     {item.original_title !== "undefined" ? item.original_title : item.title}
                </Text>
                <Image
                    source={getImageApi(item.poster_path !== "undefined" ? item.poster_path : item.backdrop_path)}
                    defaultSource={
                        require('../../../../../../assets/images/not_found.png')
                    }
                />
                <Text style={styles.ReleaseYearPopup}>
                    Release Year: {item.release_date}
                </Text>

                <Text style={styles.plotPopup}>
                    Description: {item.overview}
                </Text>

                <Button
                    onPress={onPress}
                    title="Close"
                />
            </View>
        </Modal>
    )
}

export default CustomModal;