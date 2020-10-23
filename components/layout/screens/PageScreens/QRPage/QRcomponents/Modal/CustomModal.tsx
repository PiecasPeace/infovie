import React from 'react';
import { Modal, View, Text, Image, Button } from 'react-native';
import { movieIDItem } from '../../utils/interface/IDInterface';
import { getImageApi } from '../../../../../../utils/images';
import { styles } from './styles';

interface ICustomModalProps {
    onPress: () => void;
    item: movieIDItem;
    visible: boolean;
}

const CustomModal = ({ item, onPress, visible }: ICustomModalProps) => {
    return (
        <Modal
            animationType='fade'
            transparent={false}
            visible={visible}
        >
            <View style={styles.ContainerPopup}>
                <Text style={styles.titlePopup}>
                   TEXT: {item.original_title !== "undefined" ? item.original_title : item.title}
                </Text>
                {/* <Image
                    source={getImageApi(item.poster_path)}
                    defaultSource={
                        require('../../../../../../assets/images/not_found.png')
                    }
                /> */}
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