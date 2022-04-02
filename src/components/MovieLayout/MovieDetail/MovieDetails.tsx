import React, {useState} from 'react';
import {View, ListRenderItem, Text, ListRenderItemInfo} from 'react-native';
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
import CustomSafeAreaView from '../../Screen/CustomSafeAreaView';
import {tmdbGetById} from '../../../constants/services/APICallsTMDB';
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
import {CastModal} from '../Cast/CastModal/CastModal';
import {BLUE} from '../../../constants/Colors/colorpalette';
import {fontSizeResponsive} from '../../../constants/utils/dimensions';

export const MovieDetails: React.FC<IMovieDetailProps> = ({
  item,
  route,
  navigation,
}: IMovieDetailProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [personVisible, setPersonVisible] = useState<boolean>(false);
  const [companyVisible, setCompanyVisible] = useState<boolean>(false);
  const [creditId, setCreditId] = useState<number>(0);
  const [companyId, setCompanyId] = useState<number>(0);
  const [detailInfo, setDetailInfo] = useState(IOriginal_Info);

  useFocusEffect(
    React.useCallback(() => {
      requestMovieDetails();
    }, []),
  );

  const handleImage = () => {
    setShowImage(!showImage);
  };
  //PERSON
  const handlePersonModal = (id: number) => {
    setCreditId(id);
    handleVisiblePerson();
  };
  const handleVisiblePerson = () => {
    setPersonVisible(!personVisible);
  };

  //COMPANY
  const handleCompanyModal = (id: number) => {
    setCompanyId(id);
    handleVisibleCompany();
  };

  const handleVisibleCompany = () => {
    setCompanyVisible(!companyVisible);
  };

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
      await tmdbGetById(id).then(async (item: IMovieIDInterface) => {
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
        setLoading(false);
      });
      console.log(tmdbGetById(id));
      console.log(cast);
    } catch (err) {
      console.log('Error at MovieDetails');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const renderEmptyList = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: fontSizeResponsive(2.1),
            color: BLUE,
            textAlign: 'justify',
          }}>
          No Information
        </Text>
      </View>
    );
  };

  const PersonList: ListRenderItem<ICastItem> = ({
    item,
  }: ListRenderItemInfo<ICastItem>) => (
    <CastItem
      credit_id={item.credit_id}
      image={item.profile_path || null}
      name={item.character}
      original_name={item.original_name}
      onPress={() => handlePersonModal(item.id)}
    />
  );

  const CrewList: ListRenderItem<ICrewItem> = ({
    item,
  }: ListRenderItemInfo<ICrewItem>) => (
    <CastItem
      credit_id={item.credit_id}
      image={item.profile_path || null}
      name={item.known_for_department}
      original_name={item.original_name}
      onPress={() => handlePersonModal(item.id)}
    />
  );

  const CompanyList: ListRenderItem<IProductionCompanies> = ({
    item,
  }: ListRenderItemInfo<IProductionCompanies>) => (
    <CastItem
      credit_id={item.id}
      image={item.logo_path || null}
      name={item.origin_country}
      original_name={item.name}
      onPress={() => handleCompanyModal(item.id)}
    />
  );
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
    <CustomSafeAreaView>
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
              <PersonRowList
                data={cast}
                renderItem={PersonList}
                ListEmptyComponent={renderEmptyList}
              />
            </SelectionRow>
            <SelectionRow title={'Producer'}>
              <CrewRowList
                data={crew}
                renderItem={CrewList}
                ListEmptyComponent={renderEmptyList}
              />
            </SelectionRow>
            <SelectionRow title={'Companies'}>
              <CompanyRowList
                data={production_companies}
                renderItem={CompanyList}
                ListEmptyComponent={renderEmptyList}
              />
            </SelectionRow>
          </View>
          <CastModal
            isVisible={personVisible}
            creditId={creditId}
            onClose={handleVisiblePerson}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
};
