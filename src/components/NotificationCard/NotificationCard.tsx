import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_BLUE, WHITE} from '../../constants/Colors/colorpalette';
import {width} from '../../constants/utils/dimensions';
import {CustomTouchableOpacity} from '../blueprints/CustomTouchableOpacity/CustomTouchableOpacity';
import {styles} from './styles';

interface INotificationCardProps {
  style: {};
  icon: string;
  textError: string;
  textButton: string;
  onPress: () => Promise<void> | undefined;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
  style = styles.containerError,
  icon,
  textError,
  textButton,
  onPress,
}: INotificationCardProps) => (
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
