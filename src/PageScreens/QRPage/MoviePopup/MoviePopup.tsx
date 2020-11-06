import React from 'react';
import {Modal, View, Text, Image} from 'react-native';
import {getImageApi} from '../../../components/utils/Image';
import {styles} from './styles';
import {ICustomModalProps} from './ICustomMoviePopup';
import {convertToYear} from '../../../components/utils/Dates';
import {convertTypeWithGenreByID} from '../../../components/utils/genre';
import {getLanguage} from '../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../constants/MovieScore/renderScore';
import {renderDivider} from '../../../constants/RenderDivider/RenderDivider';
import {CustomButton} from '../../../components/CustomButton/CustomButton';

export const MoviePopup: React.FC<ICustomModalProps> = ({
  item,
  onPress,
  visible,
}: ICustomModalProps) => {
  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View style={styles.containerItem}>
        <Image
          source={getImageApi(item.poster_path)}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={styles.item}>
          <View>
            <Text numberOfLines={2} style={styles.headertext}>
              {item.title}
            </Text>
            <View style={[styles.textRow, styles.containerSubTitle]}>
              <Text style={styles.textSmall}>
                {convertToYear(item.release_date)}
              </Text>
              {renderDivider(item.release_date, item.original_language)}
              <Text numberOfLines={1} style={styles.textSmall}>
                {getLanguage(item.original_language)}
              </Text>
            </View>
            <Text numberOfLines={3} style={styles.textSmall}>
              {convertTypeWithGenreByID(item.genres)}
            </Text>
          </View>
          <View style={[styles.textRow, styles.containerReview]}>
            {renderScore(item.vote_average)}
          </View>
        </View>
      </View>
      <CustomButton
        style={styles.textSmall}
        Text="CLOSE BUTTON"
        color="#010101"
        onPress={onPress}
        mode="outlined"
      />
    </Modal>
  );
};
