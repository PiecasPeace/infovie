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
                    {item.title !== undefined ? item.title : item.original_title}
                </Text>
                <View style={{alignContent:"space-between", justifyContent:"space-between"}}>
                    <Image
                        source={getImageApi(item.poster_path)}
                        defaultSource={
                            require('../../../../../../assets/images/not_found.png')
                        }
                        style={styles.ImagePopup}
                    />
                    <Text style={styles.ReleaseYearPopup}>
                        Release Year: {item.release_date}
                    </Text>

                </View>
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