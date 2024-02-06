import { useState } from 'react';
import TextField from '../TextField';
import VisaSvg from '../Svgs/Visa';
import MasterCard from '../Svgs/MasterCard';

const CreditCardInput = ({ onChange, ...props }: Partial<TextFieldProps>) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cardType, setCardType] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Sadece sayıları alır
    setCreditCardNumber(inputValue);

    // Kredi kartı tipini belirleme
    let detectedCardType = '';

    if (/^4/.test(inputValue)) {
      detectedCardType = 'Visa';
    } else if (/^5[1-5]/.test(inputValue)) {
      detectedCardType = 'MasterCard';
    }

    setCardType(detectedCardType);

    // Dışarıdan gelen onChange fonksiyonunu çağır
    if (onChange) {
      onChange(inputValue, detectedCardType);
    }
  };

  const formatCreditCardNumber = (number) => {
    // Her 4 karakterden sonra bir boşluk ekler
    return number
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const getIcon = () => {
    if (cardType === 'Visa') {
      return <VisaSvg />;
    } else if (cardType === 'MasterCard') {
      return <MasterCard />;
    }
  };

  return (
    <TextField
      type="text"
      id="creditCardNumber"
      value={formatCreditCardNumber(creditCardNumber)}
      onChange={handleInputChange}
      maxLength={19}
      placeholder="1234 5678 9012 3456"
      icon={getIcon()}
      fullWidth
      label="Kredi Kartı Numarası"
      className="tracking-wider"
      {...props}
    />
  );
};

export default CreditCardInput;
