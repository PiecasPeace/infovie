import React, {useState} from 'react';
import {View, ListRenderItem, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {CastItem} from '../Cast/CastItem';
import {
  ICastItem,
  ICrewItem,
  IMovieIDInterface,
  IProductionCompanies,
} from '../../../constants/Interfaces/IMovieByIDInterface';
import {sliceArrayLength} from '../../../constants/utils/sliceArrayLength';
import {ScrollView} from 'react-native-gesture-handler';
import {SelectionRow} from '../Cast/SelectionRow/SelectionRow';
import {PosterImages} from '../PosterImages/PosterImages';
import Screen from '../../Screen/Screen';
import {tmdbGetById} from '../../../constants/APICalls/APICallsTMDB';
import {convertMinsToHrs} from '../../../constants/convert/convertMinToHour';
import {convertTypeWithGenre} from '../../../constants/utils/genreFunctions';
import {convertToDate} from '../../../constants/convert/convertToDates';
import {convertToDollar} from '../../../constants/convert/convertToDollar';
import Spinner from '../../Spinner/Spinner';
import {
  ADULT_RATE,
  IOriginal_Info,
  UNINFORMED,
} from './Interfaces/IOriginal_Info';
import {convertToUpperCase} from '../../../constants/convert/convertToUpperCase';
import {isoLanguage} from '../../../constants/isoLanguage';
import {CompanyRowList} from '../Cast/SelectionRow/DetailRowList/CompanyRow/ComapanyRowList';
import {CrewRowList} from '../Cast/SelectionRow/DetailRowList/CrewRow/CrewRowList';
import {PersonRowList} from '../Cast/SelectionRow/DetailRowList/PersonRow/PersonRowList';
import {IMovieDetailProps} from './Interfaces/IMovieDetailProps';
import {formatImageUrl} from '../../../constants/utils/formatImageFormat';
import ReadMore from 'react-native-read-more-text';
import {styles} from './styles';
import {ReadMoreFooter} from './HandleReadMore/ReadMoreFooter';

export const MovieDetails: React.FC<IMovieDetailProps> = ({
  item,
  route,
  navigation,
}: IMovieDetailProps) => {
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [detailInfo, setDetailInfo] = useState(IOriginal_Info);
  const handleImage = () => {
    setShowImage(!showImage);
  };

  useFocusEffect(
    React.useCallback(() => {
      requestMovieDetails();
    }, []),
  );

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
    Language: convertToUpperCase(isoLanguage[original_language]),
    Release: convertToDate(release_date),
    Budget: convertToDollar(budget),
    Revenue: convertToDollar(revenue),
    Adult: ADULT_RATE[adult] || UNINFORMED,
  });

  const requestMovieDetails = async () => {
    setLoading(true);
    try {
      const {id} = route.params;
      await tmdbGetById(id).then(async (item) => {
        // if (return.result === 0) {
        //   await tmdbGetByIdTV(id).then(async (item) => {
        //     setDetailInfo({
        //       id,
        //       backdrop_path: item.backdrop_path || IOriginal_Info.backdrop_path,
        //       title: item.title || IOriginal_Info.title,
        //       vote_average: item.vote_average || IOriginal_Info.vote_average,
        //       video: item.videos.results || IOriginal_Info.video,
        //       overview: item.overview || IOriginal_Info.overview,
        //       cast: sliceArrayLength(item.credits.cast, 15),
        //       crew: sliceArrayLength(item.credits.crew, 15),
        //       production_companies: sliceArrayLength(item.production_companies, 10),
        //       images: formatImageUrl(item.images.backdrops),
        //       infosDetail: getInfosDetail(item),
        //     });
        //   })
        // }
        setLoading(false);
        setDetailInfo({
          id,
          backdrop_path: item.backdrop_path || IOriginal_Info.backdrop_path,
          title: item.title || IOriginal_Info.title,
          vote_average: item.vote_average || IOriginal_Info.vote_average,
          video: item.videos.results || IOriginal_Info.video,
          overview: item.overview || IOriginal_Info.overview,
          cast: sliceArrayLength(item.credits.cast, 15),
          crew: sliceArrayLength(item.credits.crew, 15),
          production_companies: sliceArrayLength(item.production_companies, 10),
          images: formatImageUrl(item.images.backdrops),
          infosDetail: getInfosDetail(item),
        });
      });
      console.log(tmdbGetById(id));
    } catch (err) {
      console.log('Error at MovieDetails');
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
    overview,
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
            navigation={navigation}
            showImage={showImage}
            onPress={handleImage}
            item={item}
          />
          <View style={{marginLeft: 10}}>
            {/* <View style={styles.grayHeader}></View> */}
            <SelectionRow title={'Overview'}>
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={(handlePress: () => void) =>
                  ReadMoreFooter({text: 'Read more', handlePress})
                }
                renderRevealedFooter={(handlePress: () => void) =>
                  ReadMoreFooter({text: 'Read less', handlePress})
                }>
                <Text style={styles.readMoreFooter}>{overview}</Text>
              </ReadMore>
            </SelectionRow>

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
    </Screen>
  );
};

const PersonList: ListRenderItem<ICastItem> = ({item}) => (
  <CastItem
    credit_id={item.credit_id}
    image={item.profile_path}
    name={item.character}
    original_name={item.original_name}
  />
);

const CrewList: ListRenderItem<ICrewItem> = ({item}) => (
  <CastItem
    credit_id={item.credit_id}
    image={item.profile_path || null}
    name={item.known_for_department}
    original_name={item.original_name}
  />
);

const CompanyList: ListRenderItem<IProductionCompanies> = ({item}) => (
  <CastItem
    credit_id={`${item.id}`}
    image={item.logo_path || null}
    name={item.origin_country}
    original_name={item.name}
  />
);
