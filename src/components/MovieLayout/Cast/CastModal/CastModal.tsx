import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WHITE} from '../../../../constants/Colors/colorpalette';
import {tmdbGetPerson} from '../../../../constants/services/APICallsTMDB';
import {width} from '../../../../constants/utils/dimensions';
import {getImageApi} from '../../../../constants/utils/Image';
import {CustomButton} from '../../../blueprints/CustomButton/CustomButton';
import NotificationCard from '../../../NotificationCard/NotificationCard';
import Spinner from '../../../Spinner/Spinner';
import {styles} from './styles';

interface ICastModalProps {
  isVisible: boolean;
  onClose: () => void;
  creditId: number;
  style: {};
}

const UNINFORMED = 'Uninformed';
const INITIAL_INFO = {
  profilePath: '',
  name: `${UNINFORMED} name`,
  knownForDepartment: `${UNINFORMED} department`,
  birthday: '',
  placeOfBirth: `${UNINFORMED} place of birth`,
  biography: UNINFORMED,
};

export const CastModal: React.FC<ICastModalProps> = ({
  isVisible,
  onClose,
  creditId,
  style,
}: ICastModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState(INITIAL_INFO);
  const {name, profilePath, knownForDepartment, placeOfBirth, biography} = info;

  useEffect(() => {
    requestTeamInfo();
  }, [creditId]);

  const getAge = () => {
    const {birthday} = info;

    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
      return `${age} years`;
    }

    return `${UNINFORMED} age`;
  };

  const requestTeamInfo = async () => {
    try {
      if (creditId) {
        setIsLoading(true);

        const data = await tmdbGetPerson(creditId);

        setInfo({
          profilePath: data.profile_path || INITIAL_INFO.profilePath,
          name: data.name || INITIAL_INFO.name,
          knownForDepartment:
            data.known_for_department || INITIAL_INFO.knownForDepartment,
          birthday: data.birthday || INITIAL_INFO.birthday,
          placeOfBirth: data.place_of_birth || INITIAL_INFO.placeOfBirth,
          biography: data.biography || INITIAL_INFO.biography,
        });
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View style={style}>
        <View style={styles.containerModal}>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <ScrollView style={styles.containerScroll}>
              <NotificationCard
                textError="Something wrong has happened, please try again later."
                textButton="Load"
                style
                icon="alert-octagon"
                onPress={requestTeamInfo}
              />
            </ScrollView>
          ) : (
            <ScrollView style={styles.containerScroll}>
              <View style={styles.containerMainText}>
                <Image
                  source={getImageApi(profilePath)}
                  style={styles.photo}
                  width={width * 0.33}
                />
                <View style={styles.textItens}>
                  <Text style={styles.titleName}>{name}</Text>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}>
                      {knownForDepartment}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}>
                      {getAge()}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}>
                      {placeOfBirth}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.titleInfo}>Biography</Text>
              <Text
                style={[
                  styles.textSmall,
                  styles.textLineHeight,
                  styles.textJustify,
                ]}>
                {biography}
              </Text>
            </ScrollView>
          )}
          <View style={styles.containerRow}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <MaterialCommunityIcons
                name={'chevron-down'}
                size={width * 0.09}
                color={WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
