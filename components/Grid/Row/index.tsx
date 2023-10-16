import React, { HTMLAttributes } from "react";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string; // Özel sınıf eklemek için
  gutter?: string; // Kolonlar arasındaki boşluk (örnek: "1rem")
}

const Row: React.FC<RowProps> = ({
  children,
  className = "",
  gutter,
  ...rest
}) => {
  const rowStyles = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: gutter || "0",
  };

  return (
    <div {...rest} className={`row ${className}`} style={rowStyles}>
      {children}
    </div>
  );
};

export default Row;
