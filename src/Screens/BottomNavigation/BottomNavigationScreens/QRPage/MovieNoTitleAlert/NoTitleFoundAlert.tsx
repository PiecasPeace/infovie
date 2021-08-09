import {Alert, Image, View} from 'react-native';

const noFoundImage = () => require('../../../../../assets/images/not_found.png');
export const ShowNotFound = () => {
  return (
    <View style={{flex: 1, width: 300}}>
      <Image source={noFoundImage()} style={{width: 130, height: 120}} />
    </View>
  );
};

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
