import React, { HTMLAttributes } from "react";

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  xs?: number; // Ekstra küçük boyut (1-12 arası)
  sm?: number; // Küçük boyut (1-12 arası)
  md?: number; // Orta boyut (1-12 arası)
  lg?: number; // Büyük boyut (1-12 arası)
  xl?: number; // Ekstra büyük boyut (1-12 arası)
  xxl?: number; // Ekstra ekstra büyük boyut (1-12 arası)
  children: React.ReactNode;
  className?: string; // Özel sınıf eklemek için
}

const Col: React.FC<ColProps> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
  className = "",
  ...rest
}) => {
  const colStyles = {
    gridColumn: "span 12", // Varsayılan değer: Tüm ekran boyutları için 12 kolon kaplar
  };

  if (xs) colStyles.gridColumn = `span ${xs}`;
  if (sm) colStyles.gridColumn = `span ${sm}`;
  if (md) colStyles.gridColumn = `span ${md}`;
  if (lg) colStyles.gridColumn = `span ${lg}`;
  if (xl) colStyles.gridColumn = `span ${xl}`;
  if (xxl) colStyles.gridColumn = `span ${xxl}`;

  return (
    <div {...rest} className={`col ${className}`} style={colStyles}>
      {children}
    </div>
  );
};

export default Col;
