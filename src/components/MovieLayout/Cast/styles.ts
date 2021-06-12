import {StyleSheet} from 'react-native';
import {height} from '../../../constants/utils/dimensions';

export const styles = StyleSheet.create({
  castContainer: {padding: 10, height: height * 0.2},
  photo: {
    height: 80,
    width: 80,
    borderRadius: 35,
    marginBottom: 3,
    marginTop: 3,
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    width: 80,
  },
  character: {
    width: 80,
    textAlign: 'center',
    marginRight: 10,
  },
});
