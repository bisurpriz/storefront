import { useEffect, useRef, useState } from "react";
import TextField from "../TextField";
import { checkBin } from "@/app/iyzico-payment/actions";
import { getCardAssociationImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import CreditCard from "../Icons/CreditCard";

const CreditCardInput = ({ onChange, ...props }: Partial<TextFieldProps>) => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cardTypeImage, setCardTypeImage] = useState("");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e) => {
    const { value } = e.target;
    const number = value.replace(/\D/g, "");

    setCreditCardNumber(formatCreditCardNumber(number));

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      if (number.length > 5) {
        const { cardAssociation } = await checkBin({
          binNumber: number.slice(0, 6),
        });
        if (cardAssociation)
          setCardTypeImage(getCardAssociationImageUrl(cardAssociation));
      } else setCardTypeImage("");
      onChange(e, formatCreditCardNumber(number));
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        setCardTypeImage("");
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const formatCreditCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <TextField
      type="text"
      id="creditCardNumber"
      value={formatCreditCardNumber(creditCardNumber)}
      onChange={handleInputChange}
      maxLength={19}
      placeholder="Lütfen kart numaranızı giriniz"
      icon={
        cardTypeImage ? (
          <Image width={20} height={20} src={cardTypeImage} alt="card type" />
        ) : (
          <CreditCard className="text-xl" />
        )
      }
      fullWidth
      label="Kart Numarası"
      className="tracking-wider"
      {...props}
    />
  );
};

export default CreditCardInput;
