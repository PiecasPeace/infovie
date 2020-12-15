import { ReactElement } from "react";

export interface MapContextProviderProps {
  children: ReactElement | ReactElement[];
}

//KEYS FOR MAPS IN CONTEXT
export const FAV_KEY = '@fav_key';
export const OWN_KEY = '@own_key';