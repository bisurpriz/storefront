import { useCallback, useEffect, useRef, useState } from "react";
import TextField from "../TextField";
import VisaSvg from "../Svgs/Visa";
import MasterCard from "../Svgs/MasterCard";
import AmexSvg from "../Svgs/Amex";

const cardTypes = [
  {
    type: "Visa",
    pattern: /^4/,
  },
  {
    type: "MasterCard",
    pattern: /^5[1-5]/,
  },
  {
    type: "Amex",
    pattern: /^3[47]/,
  },
  {
    type: "Discover",
    pattern: /^6(?:011|5)/,
  },
  {
    type: "DinersClub",
    pattern: /^3(?:0[0-5]|[68])/,
  },
  {
    type: "JCB",
    pattern: /^(?:2131|1800|35)/,
  },
  {
    type: "UnionPay",
    pattern: /^(62|88)/,
  },
  {
    type: "Maestro",
    pattern: /^(5018|5020|5038|6304|6759|6761|6763)/,
  },
  {
    type: "Mir",
    pattern: /^2200/,
  },
  {
    type: "UATP",
    pattern: /^(1)/,
  },
];

const CreditCardInput = ({ onChange, ...props }: Partial<TextFieldProps>) => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardType, setCardType] = useState("");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const getCardType = useCallback((number) => {
    let detectedCardType = "";

    cardTypes.forEach((card) => {
      if (card.pattern.test(number)) {
        detectedCardType = card.type;
      }
    });

    return detectedCardType;
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const number = value.replace(/\s/g, "");

    setCreditCardNumber(formatCreditCardNumber(number));

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setCardType(getCardType(number));
      onChange(e, formatCreditCardNumber(number));
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const formatCreditCardNumber = useCallback((number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  }, []);

  const getIcon = () => {
    switch (cardType) {
      case "Visa":
        return <VisaSvg />;
      case "MasterCard":
        return <MasterCard />;
      case "Amex":
        return <AmexSvg width={24} height={24} />;
      default:
        return null;
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
