import {Alert} from 'react-native';

export const NoTitleFoundAlert = (
  lightTitle: string,
  strongTitle: string,
  onPressCancel: () => void,
  onPressYes: () => void,
) => {
  Alert.alert(
    `Title not found`,
    `Couldnt find title \n\n"${lightTitle.trim()}" \n\nSearch with "${strongTitle.trim()}" instead?`,
    [
      {
        text: 'Cancel',
        onPress: () => onPressCancel(),
        style: 'destructive',
      },
      {
        text: 'Yes',
        onPress: async () => onPressYes(),
      },
    ],
    {cancelable: false},
  );
};
