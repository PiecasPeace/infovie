import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';

const AboutPageScreen: React.FC = () => {
  const [Favorite, setFavorite] = useState(false);
  let AutoMap = new Map();

  interface IAuto {
    name: string;
    baujahr: number;
    gewicht: number;
    hersteller: string;
  }

  const autos: IAuto[] = [
    {name: 'TypeA', baujahr: 2000, gewicht: 1300, hersteller: 'Blabla'},
    {name: 'TypeB', baujahr: 1997, gewicht: 2000, hersteller: 'XYZ'},
    {name: 'Haiya', baujahr: 2015, gewicht: 1450, hersteller: 'UncleRoger'},
    {name: 'Egal', baujahr: 2000, gewicht: 1600, hersteller: 'Test'},
  ];

  for (let i = 0; i < autos.length; i++) {
    AutoMap = AutoMap.set(autos[i].name, autos[i]);
  }
  console.log(Array.from(AutoMap));
  for (let [key, value] of AutoMap.entries()) {
    console.log(key);
    console.log(value)
  }

  return (
    <View style={{backgroundColor: '#55505e'}}>
      <Text>ABOUUUUUUUUUUUUT</Text>

      <Button title="DINGDONG" onPress={() => console.log()}></Button>
    </View>
  );

  let myMap = new Map();

  let keyString = 'ONE STRING',
    keyObjForPeta = {
      name: 'peta',
      age: '22',
      id: 400,
      favorite: false,
    },
    keyObjForPetasID = {
      id: 400,
    },
    keyObjForTina = {
      name: 'Tina',
      age: '18',
      id: 13,
      favorite: false,
    },
    keyFunc = () => {
      return 'AROMA';
    };
  myMap.set(keyString, (Password) => 'ABCDDEFGG');

  myMap.set(keyObjForTina, 'TINA_18_13');
  myMap.set(keyFunc, 'WALUIGI');

  const handleFavorite = () => {
    // setFavorite(keyObjForPeta.favorite = true);
    myMap.set(keyObjForPeta.favorite, setFavorite(true));
    console.log(keyObjForPeta);
  };

  // myMap.forEach(function (value, key) {
  //   console.log(key + ' = ' + value);
  // }, myMap);

  let my2Map = new Map();
  my2Map.set(1, 'one');
  my2Map.set(2, 'two');

  for (let [key, value] of my2Map.values()) {
    // console.log(value);
  }
  for (let key of my2Map.entries()) {
    // console.log(key)
  }
  my2Map.set(keyObjForPetasID, 'favorite: false');
};
export const genre = {
  '12': {name: 'Adventure'},
  '14': {name: 'Fantasy'},
  '16': {name: 'Animation'},
  '18': {name: 'Drama'},
  '27': {name: 'Horror'},
  '28': {name: 'Action'},
  '35': {name: 'Comedy'},
  '36': {name: 'History'},
  '37': {name: 'Western'},
  '53': {name: 'Thriller'},
  '80': {name: 'Crime'},
  '99': {name: 'Documentary'},
  '878': {name: 'Science Fiction'},
  '9648': {name: 'Mystery'},
  '10402': {name: 'Music'},
  '10749': {name: 'Romance'},
  '10751': {name: 'Family'},
  '10752': {name: 'War'},
  '10770': {name: 'TV Movie'},
};

export const genreMap = new Map([
  [12, `${144} Apples`],
  [14, 'TV Movie'],
  [16, 'Animation'],
  [18, 'Drama'],
  [27, 'Horror'],
  [28, 'Action'],
  [35, 'Comedy'],
  [36, 'History'],
  [37, 'Western'],
  [53, 'Thriller'],
  [80, 'Crime'],
  [99, 'Documentary'],
  [878, 'Science Fiction'],
  [9648, 'Mystery'],
  [10402, 'Music'],
  [10749, 'Romance'],
  [10751, 'Family'],
  [10752, 'War'],
  [10770, 'TV Movie'],
]);
// console.log(genreMap.get(12))

export default AboutPageScreen;
