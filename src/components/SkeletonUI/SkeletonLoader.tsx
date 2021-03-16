import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {DARK_GRAY, LIGHT_GRAY} from '../../constants/Colors/colorpalette';
import {styles} from './styles';

export const SkeletonLoader: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder
        backgroundColor={LIGHT_GRAY}
        highlightColor={DARK_GRAY}
        speed={1200}>
        <View style={styles.skeletonContainer}>
          <View style={styles.picture} />
          <View style={styles.detailsContainer}>
            <View>
              <View style={styles.title}></View>
              <View style={styles.yearAndLanguage} />
              <View style={styles.yearAndLanguage} />
            </View>
            <View>
              <View style={styles.textRow}></View>
              <View style={styles.rating} />
              <View style={styles.favoriteButton}></View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder
        backgroundColor={LIGHT_GRAY}
        highlightColor={DARK_GRAY}
        speed={1200}>
        <View style={styles.skeletonContainer}>
          <View style={styles.picture} />
          <View style={styles.detailsContainer}>
            <View>
              <View style={styles.title}></View>
              <View style={styles.yearAndLanguage} />
              <View style={styles.yearAndLanguage} />
            </View>
            <View>
              <View style={styles.textRow}></View>
              <View style={styles.rating} />
              <View style={styles.favoriteButton}></View>
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
