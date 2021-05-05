import React, {useState} from 'react';
import {Modal, View, Text, Image, ListRenderItem} from 'react-native';
import {getImageApi} from '../../utils/Image';
import {styles} from './styles';
import {IMoviePopupProps} from './IMoviePopupProps';
import {convertToYear} from '../../utils/dates';
import {moviePopupGenre} from '../../utils/genreFunctions';
import {getLanguage} from '../../../constants/Language/getLanguageFunction';
import {renderScore} from '../../../constants/MovieScore/renderScore';
import {renderDivider} from '../../../constants/RenderDivider/RenderDivider';
import {CustomButton} from '../../CustomButton/CustomButton';
import {
  CompanyRowList,
  CrewRowList,
  PersonRowList,
} from '../Cast/PersonRowList';
import {PeopleItem} from '../Cast/PersonItem';
import {
  ICastItem,
  ICrewItem,
  IMovieIDInterface,
  IProductionCompanies,
} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDInterface';
import {sliceArrayLength} from '../../utils/array';
import {ScrollView} from 'react-native-gesture-handler';
import {SelectionRow} from '../Cast/SelectionRow/SelectionRow';
import {IMovieIDTVInterface} from '../../../Screens/BottomNavigation/BottomNavigationScreens/QRPage/Interfaces/IMovieByIDTVInterface';
import {PosterImages} from '../PosterImages/PosterImages';

export interface MoviePopupProps {
  onPress: () => void;
  item: IMovieIDInterface;
  visible: boolean;
}

export interface TVSeriesPopupProps {
  onPress: () => void;
  TVitem: IMovieIDTVInterface;
  visible: boolean;
}
type MovieProps = MoviePopupProps & TVSeriesPopupProps;

export const MoviePopup: React.FC<MovieProps> = ({
  item,
  onPress,
  visible,
  TVitem,
}: MovieProps) => {
  const [showImage, setShowImage] = useState(false);

  const handleImage = () => {
    setShowImage(!showImage);
  };
  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <ScrollView>
        <PosterImages
          title={item.title}
          backdropPath={item.backdrop_path}
          vote_average={item.vote_average}
          images={item.images.backdrops}
          video={item.videos}
          // navigate={navigate}
          showImage={showImage}
          onPress={handleImage}
          // handlePlayVideo={handlePlayVideo}
        />
        <View style={{marginLeft: 2, marginRight: 2}}>
          {/* <View style={styles.containerItem}>
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
                  {moviePopupGenre(item.genres)}
                </Text>
              </View>
              <View style={[styles.textRow, styles.containerReview]}>
                {renderScore(item.vote_average)}
              </View>
            </View>
          </View> */}

          <View style={styles.grayHeader}></View>
          <SelectionRow title={'Main Cast'}>
            <PersonRowList
              data={sliceArrayLength(item.credits.cast, 15)}
              renderItem={PersonList}
            />
          </SelectionRow>
          <SelectionRow title={'Producer'}>
            <CrewRowList
              data={sliceArrayLength(item.credits.crew, 15)}
              renderItem={CrewList}
            />
          </SelectionRow>
          <SelectionRow title={'Companies'}>
            <CompanyRowList
              data={sliceArrayLength(item.production_companies, 15)}
              renderItem={CompanyList}
            />
          </SelectionRow>
        </View>
      </ScrollView>
      <CustomButton
        style={styles.closeBtn}
        Text="CLOSE BUTTON"
        color="#010101"
        onPress={onPress}
        mode="outlined"
      />
    </Modal>
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
