import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_BLUE, WHITE} from '../../constants/Colors/colorpalette';
import {width} from '../../constants/utils/dimensions';
import {CustomTouchableOpacity} from '../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';
import {styles} from './styles';

interface INotificationCard {
  style: {};
  icon: 'alert-octagon';
  textError: 'Something wrong has happened, please try again later.';
  textButton: 'Load';
  onPress: () => Promise<void> | undefined;
}

const NotificationCard: React.FC<INotificationCard> = ({
  style = styles.containerError,
  icon,
  textError,
  textButton,
  onPress,
}: INotificationCard) => (
  <View style={style}>
    <MaterialCommunityIcons name={icon} size={width * 0.09} color={WHITE} />
    <Text style={styles.errorInfo}>{textError}</Text>
    {onPress && (
      <CustomTouchableOpacity
        activeOpacity={0.5}
        style={styles.loadingButton}
        onPress={onPress}>
        <Text style={styles.loadingText}>{textButton}</Text>
      </CustomTouchableOpacity>
    )}
  </View>
);

export default NotificationCard;
