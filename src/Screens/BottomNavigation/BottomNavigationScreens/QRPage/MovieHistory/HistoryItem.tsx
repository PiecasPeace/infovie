import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import {CustomButton} from '../../../../../components/CustomButton/CustomButton';
import {
  WHITE,
  BORDEAUX_RED,
} from '../../../../../constants/Colors/colorpalette';
import {styles} from './styles';
import {HistoryProps, HistoryItemProps} from './IMovieHistoryInterface';

const HistoryItem = ({
  history,
  index,
  buttonStyle,
  onPress,
}: HistoryItemProps) => {
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
          onPress={onPress}
          contentStyle={{backgroundColor: BORDEAUX_RED}}
          mode={'contained'}
          color={WHITE}
          Text="Search"
          style={buttonStyle}
          labelStyle={styles.buttonLabel}
        />
      </View>
    </View>
  );
};

const TwoHistory = ({history, onPress}: HistoryProps) => {
  return (
    <Fragment>
      <HistoryItem
        index={0}
        buttonStyle={styles.buttonLabel}
        history={history}
        onPress={onPress}
      />
      <HistoryItem
        index={1}
        buttonStyle={styles.buttonLabel}
        history={history}
        onPress={onPress}
      />
    </Fragment>
  );
};
const ThreeHistory = ({history, onPress}: HistoryProps) => {
  return (
    <View>
      <TwoHistory history={history} onPress={onPress} />
      <HistoryItem
        index={2}
        buttonStyle={styles.buttonLabel}
        history={history}
        onPress={onPress}
      />
    </View>
  );
};

export const ShowHistory = ({history, onPress}: HistoryProps) => {
  return (
    <View style={styles.historyContainer}>
      {history.length === 1 ? (
        <HistoryItem
          index={0}
          buttonStyle={styles.buttonLabel}
          history={history}
          onPress={onPress}
        />
      ) : (
        <></>
      )}
      {history.length === 2 ? (
        <TwoHistory history={history} onPress={onPress} />
      ) : (
        <></>
      )}
      {history.length >= 3 ? (
        <ThreeHistory history={history} onPress={onPress} />
      ) : (
        <></>
      )}
    </View>
  );
};
