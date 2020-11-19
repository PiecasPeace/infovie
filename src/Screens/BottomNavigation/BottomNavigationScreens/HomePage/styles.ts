import {StyleSheet} from 'react-native';
import {WHITE, LIGHT_PURPLE} from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  trendingText: {
    color: WHITE,
    fontWeight:"bold",
    textAlign:"center",
    fontSize:20,
  },
});
