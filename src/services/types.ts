export type User = {
  email: string;
};

export type Session = {
  user?: User;
};

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu?: number | null;
  target_fg: number;
  target_og: number;
  ebc?: number | null;
  srm?: number | null;
  ph?: number | null;
  attenuation_level: number;
  volume: Volume;
  boil_volume: BoilVolume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export interface Volume {
  value: number;
  unit: string;
}

export interface BoilVolume {
  value: number;
  unit: string;
}

export interface Method {
  mash_temp: MashTemp[];
  fermentation: Fermentation;
  twist?: string | null;
}

export interface MashTemp {
  temp: Temp;
  duration?: number | null;
}

export interface Fermentation {
  temp: Temp;
}

export interface Temp {
  value: number;
  unit: string;
}

export interface Ingredients {
  malt: Malt[];
  hops: Hop[];
  yeast: string;
}

export interface Malt {
  name: string;
  amount: Amount;
}

export interface Amount {
  value: number;
  unit: string;
}

export interface Hop {
  name: string;
  amount: Amount;
  add: string;
  attribute: string;
}
