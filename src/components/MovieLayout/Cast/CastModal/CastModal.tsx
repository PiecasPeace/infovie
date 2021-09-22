import {useFocusEffect} from '@react-navigation/core';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLACK, WHITE} from '../../../../constants/Colors/colorpalette';
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
import Spinner from '../../../Spinner/Spinner';
import {ReadMoreFooter} from '../../MovieDetail/HandleReadMore/ReadMoreFooter';
import {
  ICast,
  IPersonWithMovieCredits,
} from '../../MovieDetail/Interfaces/ICastWithCredits';
import {CREDITS_INIT} from './MovieCreditsInitials';
import {PERSON_INIT} from './PersonInitials';
import {styles} from './styles';

interface ICastModalProps {
  isVisible: boolean;
  onClose: () => void;
  creditId: number;
}

export const CastModal: React.FC<ICastModalProps> = ({
  isVisible,
  onClose,
  creditId,
}: ICastModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [creditLoading, setCreditsLoading] = useState(false);
  const [playedInMap, setPlayedInMap] = useState<
    Map<number, IPersonWithMovieCredits>
  >(new Map<number, IPersonWithMovieCredits>());

  const [info, setInfo] = useState(PERSON_INIT);
  const [infoCredit, setInfoCredit] = useState(CREDITS_INIT);
  const {
    name,
    profile_path,
    known_for_department,
    place_of_birth,
    biography,
    birthday,
  } = info;

  const {
    adult,
    backdrop_path,
    character,
    credit_id,
    genre_ids,
    id,
    order,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    popularity,
  } = infoCredit;
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
        let playedMovieBody = new Map<number, IPersonWithMovieCredits>();
        setCreditsLoading(true);
        const mc = await tmdbGetPersonReferences(creditId);

        for (let i = 0; i < mc.cast.length; i++) {
          playedMovieBody = playedMovieBody.set(mc.cast[i].id, mc.cast[i]);

          updateMap(mc.cast[i].id, mc.cast[i]);
        }
        setPlayedInMap(playedMovieBody);
        // console.log('HERE ARE THE PLAYEDMOVIEBODY INFORMATIONS');
        // console.log(playedMovieBody);
        // setInfoCredit({
        //   adult: mc.cast[0].adult || CREDITS_INIT.adult,
        //   backdrop_path: mc.cast[0].backdrop_path || CREDITS_INIT.backdrop_path,
        //   poster_path: mc.cast[2].poster_path || CREDITS_INIT.poster_path,
        //   character: mc.cast[0].character || CREDITS_INIT.character,
        //   credit_id: mc.cast[0].credit_id || CREDITS_INIT.credit_id,
        //   genre_ids: mc.cast[0].genre_ids || CREDITS_INIT.genre_ids,
        //   id: mc.cast[0].id || CREDITS_INIT.id,
        //   order: mc.cast[0].order || CREDITS_INIT.order,
        //   original_language:
        //     mc.cast[0].original_language || CREDITS_INIT.original_language,
        //   original_title:
        //     mc.cast[0].original_title || CREDITS_INIT.original_title,
        //   overview: mc.cast[0].overview || CREDITS_INIT.overview,
        //   popularity: mc.cast[0].popularity || CREDITS_INIT.popularity,
        //   release_date: mc.cast[0].release_date || CREDITS_INIT.release_date,
        //   title: mc.cast[0].title || CREDITS_INIT.title,
        //   video: mc.cast[0].video || CREDITS_INIT.video,
        //   vote_average: mc.cast[0].vote_average || CREDITS_INIT.vote_average,
        //   vote_count: mc.cast[0].vote_count || CREDITS_INIT.vote_count,
        // });
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
      requestTeamInfo();
      requestCredits();
    }, [creditId]),
  );

  const renderMovieCreditsItem: ListRenderItem<IPersonWithMovieCredits> = ({
    item,
  }: ListRenderItemInfo<IPersonWithMovieCredits>) => (
    <CustomTouchableOpacity
      onPress={() => console.log(item.id)}
      activeOpacity={0.5}
      key={item.id}>
      <span
        style={{
          paddingRight: 10,
          paddingTop: 5,
          width:110
        }}>
        <Image
          source={getImageApi(item.poster_path)}
          style={{
            height: 150,
            width: 100,
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
      </span>
    </CustomTouchableOpacity>
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
            <Text style={styles.titleInfo}>Biography</Text>
            <View style={{marginBottom: 10}}>
              {/* <ReadMore
                numberOfLines={8}
                renderTruncatedFooter={(handlePress: () => void) =>
                  ReadMoreFooter({text: 'Read more', handlePress})
                }
                renderRevealedFooter={(handlePress: () => void) =>
                  ReadMoreFooter({text: 'Read less', handlePress})
                }>
                <Text style={styles.readMore}>{biography}</Text>
              </ReadMore> */}
            </View>
            <Fragment>
              <Text style={styles.titleInfo}>Played in</Text>
              <CustomFlatList
                data={Array.from(playedInMap.values())}
                keyExtractor={(item: IPersonWithMovieCredits, index: number) =>
                  `${item.id}-${index}`
                }
                renderItem={renderMovieCreditsItem}
              />
            </Fragment>
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
