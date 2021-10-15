import {useFocusEffect} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ReadMore from 'react-native-read-more-text';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BLACK,
  LIGHT_PURPLE,
  WHITE,
} from '../../../../constants/Colors/colorpalette';
import {RootStackParamList} from '../../../../constants/Navigation/navigation';
import {
  tmdbGetPerson,
  tmdbGetPersonReferences,
} from '../../../../constants/services/APICallsTMDB';
import {width} from '../../../../constants/utils/dimensions';
import {getAge} from '../../../../constants/utils/getAge';
import {getImageApi} from '../../../../constants/utils/Image';
import {CustomFlatList} from '../../../blueprints/CustomFlatList/CustomFlatList';
import {CustomModal} from '../../../blueprints/CustomModal/CustomModal';
import {CustomTouchableOpacity} from '../../../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';
import NotificationCard from '../../../NotificationCard/NotificationCard';
import CustomSafeAreaView from '../../../Screen/CustomSafeAreaView';
import Spinner from '../../../Spinner/Spinner';
import {ReadMoreFooter} from '../../MovieDetail/HandleReadMore/ReadMoreFooter';
import {
  ICast,
  IPersonWithMovieCredits,
} from '../../MovieDetail/Interfaces/ICastWithCredits';
import {SelectionRow} from '../SelectionRow/SelectionRow';
import {CREDITS_INIT} from './MovieCreditsInitials';
import {PERSON_INIT} from './PersonInitials';
import {styles} from './styles';

interface ICastModalProps {
  isVisible: boolean;
  onClose: () => void;
  creditId: number;
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetails'>;
}

export const CastModal: React.FC<ICastModalProps> = ({
  isVisible,
  onClose,
  creditId,
  navigation,
}: ICastModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [creditLoading, setCreditsLoading] = useState(false);
  const [playedInMap, setPlayedInMap] = useState<
    Map<number, IPersonWithMovieCredits>
  >(new Map<number, IPersonWithMovieCredits>());

  const [info, setInfo] = useState(PERSON_INIT);
  const {
    name,
    profile_path,
    known_for_department,
    place_of_birth,
    biography,
    birthday,
  } = info;

  const updateMap = (id: number, movieValues: IPersonWithMovieCredits) => {
    setPlayedInMap(
      new Map<number, IPersonWithMovieCredits>(
        playedInMap.set(id, movieValues),
      ),
    );
  };

  const requestCredits = async () => {
    try {
      if (creditId) {
        setCreditsLoading(true);
        let playedMovieBody = new Map<number, IPersonWithMovieCredits>();
        const mc = await tmdbGetPersonReferences(creditId);

        for (let i = 0; i < mc.cast.length; i++) {
          playedMovieBody = playedMovieBody.set(mc.cast[i].id, mc.cast[i]);

          updateMap(mc.cast[i].id, mc.cast[i]);
        }
        setPlayedInMap(playedMovieBody);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCreditsLoading(false);
    }
  };

  const requestTeamInfo = async () => {
    try {
      if (creditId) {
        setIsLoading(true);
        const item = await tmdbGetPerson(creditId);

        setInfo({
          profile_path: item.profile_path || PERSON_INIT.profile_path,
          name: item.name || PERSON_INIT.name,
          known_for_department:
            item.known_for_department || PERSON_INIT.known_for_department,
          birthday: item.birthday || PERSON_INIT.birthday,
          place_of_birth: item.place_of_birth || PERSON_INIT.place_of_birth,
          biography: item.biography || PERSON_INIT.biography,
          also_known_as: item.also_known_as || PERSON_INIT.also_known_as,
          deathday: item.deathday || PERSON_INIT.deathday,
          gender: item.gender || PERSON_INIT.gender,
          homepage: item.homepage || PERSON_INIT.homepage,
          popularity: item.popularity || PERSON_INIT.popularity,
          adult: item.adult || PERSON_INIT.adult,
          id: item.id || PERSON_INIT.id,
          imdb_id: item.imdb_id || PERSON_INIT.imdb_id,
        });
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      requestCredits();
      requestTeamInfo();
    }, [creditId]),
  );
  interface ICreditLayout {
    openDetails: (id: number) => void;
    item: IPersonWithMovieCredits;
  }
  const CreditLayout: React.FC<ICreditLayout> = ({
    item,
    openDetails,
  }: ICreditLayout) => {
    return (
      <CustomTouchableOpacity
        onPress={() => openDetails(item.id)}
        activeOpacity={0.5}
        key={item.id}>
        <View
          style={{
            paddingRight: 10,
            width: '50%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            // flex:1
          }}>
          <Image
            source={getImageApi(item.poster_path)}
            style={{
              width: 130,
              height: 200,
              borderRadius: 5,
            }}
            resizeMode="cover"
          />
        </View>
      </CustomTouchableOpacity>
    );
  };

  const renderMovieCreditsItem: ListRenderItem<IPersonWithMovieCredits> = ({
    item,
  }: ListRenderItemInfo<IPersonWithMovieCredits>) => (
    <CreditLayout
      openDetails={() => navigation.navigate('MovieDetails', {id: item.id})}
      item={item}
    />
  );

  return (
    <CustomModal style={styles.modal} isVisible={isVisible} onClose={onClose}>
      <View style={styles.containerModal}>
        {isLoading && creditLoading ? (
          <Spinner />
        ) : isError ? (
          <ScrollView style={styles.containerScroll}>
            <NotificationCard
              textError="There was an error fetching. Catched in: CastModal-Notificationcard"
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
                source={getImageApi(profile_path)}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.textItems}>
                <Text style={styles.titleName}>{name}</Text>
                <View style={styles.containerTitleMargin}>
                  <Text numberOfLines={2} style={styles.textSmall}>
                    {known_for_department}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text numberOfLines={2} style={styles.textSmall}>
                    {getAge(birthday)}
                  </Text>
                </View>
                <View style={styles.containerTitleMargin}>
                  <Text numberOfLines={2} style={styles.textSmall}>
                    {place_of_birth}
                  </Text>
                </View>
              </View>
            </View>
            <SelectionRow
              marginLeft={0}
              color={LIGHT_PURPLE}
              title={'Biography'}>
              <View style={{marginBottom: 10}}>
                <ReadMore
                  numberOfLines={8}
                  renderTruncatedFooter={(handlePress: () => void) =>
                    ReadMoreFooter({text: 'Read more', handlePress})
                  }
                  renderRevealedFooter={(handlePress: () => void) =>
                    ReadMoreFooter({text: 'Read less', handlePress})
                  }>
                  <Text style={styles.readMore}>{biography}</Text>
                </ReadMore>
              </View>
            </SelectionRow>
            <CustomSafeAreaView style={{flex: 1}}>
              <SelectionRow
                title={'Played in'}
                color={LIGHT_PURPLE}
                marginLeft={0}>
                <CustomFlatList
                  horizontal={true}
                  data={Array.from(playedInMap.values())}
                  keyExtractor={(
                    item: IPersonWithMovieCredits,
                    index: number,
                  ) => `${item.id}-${index}`}
                  renderItem={renderMovieCreditsItem}
                />
              </SelectionRow>
            </CustomSafeAreaView>
          </ScrollView>
        )}
        <View style={styles.containerRow}>
          <CustomTouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={onClose}>
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={width * 0.09}
              color={BLACK}
            />
          </CustomTouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};
