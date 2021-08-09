import React from 'react';
import {View} from 'react-native';
import {BLACK} from '../../../constants/Colors/colorpalette';
import {CustomButton} from '../CustomButton/CustomButton';
import {CustomHandleDownload} from '../CustomHandleDownload/CustomHandleDownload';
import {IImageInterface} from '../../MovieLayout/MovieDetail/Interfaces/IImageInterface';
import { CustomSnackBar } from '../CustomSnackBar/CustomSnackBar';

export const CustomRenderFooter = (
  picture: IImageInterface[],
  index: number,
) => (
  <View>
    <CustomButton
      onPress={() => CustomHandleDownload(picture, index)}
      color={BLACK}
      mode={'contained'}
      Text={'Save to Gallery'}
      icon={'download'}
      style={{flex: 1, minWidth: '100%'}}
    />
  </View>
);
