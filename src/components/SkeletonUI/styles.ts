import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  skeletonContainer: {
    paddingRight: 20,
    paddingLeft: 5,
    paddingTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
  },
  picture: {
    height: 250,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
  },
  detailsContainer: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    width: '110%',
    height: 30,
    borderRadius: 3,
  },
  yearAndLanguage: {
    width: '60%',
    height: 20,
    borderRadius: 3,
    marginTop: 13,
  },
  textRow: {flexDirection: 'row'},
  rating: {width: '30%', height: 35, borderRadius: 3, marginBottom: 5},
  favoriteButton: {
    width: '110%',
    height: 40,
    borderRadius: 5,
  },
});
