export interface IPlace {
  label: string;
  placeId: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

export type PlacesAutocompleteProps = {
  placeholder?: string;
  dontChangeCookie?: boolean;
  onSelect?: (prediction?: IPlace | null) => void;
  defaultValue?: IPlace;
};

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  placeholder?: string;
  isLoading: boolean;
  isFocused: boolean;
  isGeocoding: boolean;
}

export interface PredictionsListProps {
  predictions: any[];
  isOpen: boolean;
  activeIndex: number;
  onSelect: (prediction: any) => void;
}
