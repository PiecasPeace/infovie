import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import {CustomButton} from '../../../../../components/blueprints/CustomButton/CustomButton';
import {
  WHITE,
  BORDEAUX_RED,
} from '../../../../../constants/Colors/colorpalette';
import {styles} from './styles';
import {HistoryProps, HistoryItemProps} from './IMovieHistoryInterface';

const HistoryItem = ({history, index, onPress}: HistoryItemProps) => {
  const MovieTitleIndex = () => {
    if (history[index] !== undefined) {
        return `${history[index]}`;
    }
  };
  return (
    <View>
      <Text style={styles.movieText}>{MovieTitleIndex()}</Text>
      <View style={styles.buttonView}>
        <CustomButton
          onPress={() => onPress(index)}
          contentStyle={{backgroundColor: BORDEAUX_RED}}
          mode={'contained'}
          color={WHITE}
          Text="Search"
          style={styles.buttonLabel}
          labelStyle={styles.buttonLabel}
          key={`${history[index]}`}
        />
      </View>
    </View>
  );
};
export const ShowHistory = ({history, onPress}: HistoryProps) => {
  return (
    <Fragment>
      {history.map((v, i) => {
        return (
          <HistoryItem
            index={i}
            history={history}
            onPress={() => onPress(i)}
            key={i}
          />
        );
      })}
    </Fragment>
  );
};
