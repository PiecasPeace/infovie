import React, {useState} from 'react';
import {View, ListRenderItem} from 'react-native';
import {getImageApi} from '../../utils/Image';
import {styles} from './styles';
import {CustomButton} from '../../CustomButton/CustomButton';
import {
  CompanyRowList,
  CrewRowList,
  PersonRowList,
} from '../Cast/PersonRowList';
import {PeopleItem} from '../Cast/PersonItem';
import {
  IBackDropItem,
  ICastItem,
  ICrewItem,
  IMovieIDInterface,
  IProductionCompanies,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {sliceArrayLength} from '../../utils/array';
import {ScrollView} from 'react-native-gesture-handler';
import {SelectionRow} from '../Cast/SelectionRow/SelectionRow';
import {PosterImages} from '../PosterImages/PosterImages';
import Screen from '../../Screen/Screen';
import {tmdbGetById} from '../../../constants/APICalls/APICallsTMDB';
import {useFocusEffect} from '@react-navigation/native';
import {convertMinsToHrs} from '../../../constants/convert/convertMinToHour';
import {convertTypeWithGenre} from '../../utils/genreFunctions';
import {convertToDate} from '../../../constants/convert/convertToDates';
import {convertToDollar} from '../../../constants/convert/convertToDollar';
import {IMoviePopupProps} from './IMoviePopupProps';
import Spinner  from '../../Spinner/Spinner';
import { ADULT_RATE, INITIAL_INFO, UNINFORMED } from './MovieObjects';

export const MovieDetails: React.FC<IMoviePopupProps> = ({
  item,
  onPress,
  route,
  navigation,
}: IMoviePopupProps) => {
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [detailInfo, setDetailInfo] = useState(INITIAL_INFO);
  const handleImage = () => {
    setShowImage(!showImage);
  };
  const formatImageUrl = (images: IBackDropItem[]) =>
    sliceArrayLength(images, 15).map((item: IBackDropItem) =>
      getImageApi(item.file_path, 'url', 'original'),
    );

  useFocusEffect(
    React.useCallback(() => {
      requestMovieDetails();
    }, []),
  );

  /* eslint-disable camelcase */
  const getInfosDetail = ({
    runtime = 0,
    genres = [],
    original_language = '',
    release_date = '',
    budget = 0,
    revenue = 0,
    adult = '',
  }: IMovieIDInterface) => ({
    Duration: convertMinsToHrs(runtime),
    Genre: convertTypeWithGenre(sliceArrayLength(genres, 2)),
    // Language: convertToUpperCase(isoLanguage[original_language]),
    Release: convertToDate(release_date),
    Budget: convertToDollar(budget),
    Revenue: convertToDollar(revenue),
    Adult: ADULT_RATE[adult] || UNINFORMED,
  });
  /* eslint-enable camelcase */

  const requestMovieDetails = async () => {
    setLoading(true);
    try {
      const {id} = route.params;
      await tmdbGetById(id).then(async (item) => {
        setLoading(false);
        setDetailInfo({
          id,
          backdrop_path: item.backdrop_path || INITIAL_INFO.backdrop_path,
          title: item.title || INITIAL_INFO.title,
          vote_average: item.vote_average || INITIAL_INFO.vote_average,
          video: item.videos.results || INITIAL_INFO.video,
          overview: item.overview || INITIAL_INFO.overview,
          cast: sliceArrayLength(item.credits.cast, 15),
          crew: sliceArrayLength(item.credits.crew, 15),
          production_companies: sliceArrayLength(item.production_companies, 10),
          images: formatImageUrl(item.images.backdrops),
          infosDetail: getInfosDetail(item),
        });
      });
      console.log(tmdbGetById(id))
    } catch (err) {
      console.log('Error at MovieDetailOpen');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
  const {
    backdrop_path,
    vote_average,
    title,
    images,
    video,
    cast,
    crew,
    production_companies,
  } = detailInfo;
  return (
    <Screen>
      {loading ? (
        <Spinner />
      ) : (
        <ScrollView>
          <PosterImages
            title={title}
            backdropPath={backdrop_path}
            vote_average={vote_average}
            images={images}
            video={video}
            // navigation={navigation}
            showImage={showImage}
            onPress={handleImage}
            item={item}
          />
          <View style={{marginLeft: 2, marginRight: 2}}>
            
            {/* <View style={styles.grayHeader}></View> */}
            <SelectionRow title={'Main Cast'}>
              <PersonRowList data={cast} renderItem={PersonList} />
            </SelectionRow>
            <SelectionRow title={'Producer'}>
              <CrewRowList data={crew} renderItem={CrewList} />
            </SelectionRow>
            <SelectionRow title={'Companies'}>
              <CompanyRowList
                data={production_companies}
                renderItem={CompanyList}
              />
            </SelectionRow>
          </View>
        </ScrollView>
      )}
      <CustomButton
        style={styles.closeBtn}
        Text="CLOSE BUTTON"
        color="#010101"
        onPress={() => navigation.goBack()}
        mode="outlined"
      />
    </Screen>
  );
};

const PersonList: ListRenderItem<ICastItem> = ({item}) => (
  <PeopleItem
    credit_id={item.credit_id}
    image={item.profile_path}
    name={item.character}
    original_name={item.original_name}
  />
);

const CrewList: ListRenderItem<ICrewItem> = ({item}) => (
  <PeopleItem
    credit_id={item.credit_id}
    image={item.profile_path || null}
    name={item.known_for_department}
    original_name={item.original_name}
  />
);

const CompanyList: ListRenderItem<IProductionCompanies> = ({item}) => (
  <PeopleItem
    credit_id={`${item.id}`}
    image={item.logo_path || null}
    name={item.origin_country}
    original_name={item.name}
  />
);
