export interface IPlace {
  label: string;
  placeId: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

export interface PlacesAutocompleteProps {
  placeholder?: string;
  dontChangeCookie?: boolean;
  onSelect?: (place: IPlace | null) => void;
  defaultValue?: IPlace;
}

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  isGeocoding?: boolean;
  isFocused?: boolean;
  onClear: () => void;
}

export interface PredictionsListProps {
  predictions: any[];
  isOpen: boolean;
  activeIndex: number;
  onSelect: (prediction: any) => void;
  variant?: "dropdown" | "sheet";
}
