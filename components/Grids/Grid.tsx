import React from "react";
import {
  GapLgSizes,
  GapMdSizes,
  GapSmSizes,
  GapXlSizes,
  LgSizes,
  MdSizes,
  RowLgSizes,
  RowMdSizes,
  RowSmSizes,
  RowXlSizes,
  SmSizes,
  XlSizes,
} from "./contants";

const Grid = ({
  children,
  cols,
  gap,
  rows,
  className,
  gridFlow,
}: GridProps) => {
  const gridFlowClass = gridFlow ? `grid-flow-${gridFlow}` : "";

  const getColsWithSize = () => {
    const smCols = typeof cols === "object" ? SmSizes[cols.sm!] : ``;
    const mdCols = typeof cols === "object" ? MdSizes[cols.md!] : ``;
    const lgCols = typeof cols === "object" ? LgSizes[cols.lg!] : ``;
    const xlCols = typeof cols === "object" ? XlSizes[cols.xl!] : ``;

    const gridCols =
      typeof cols === "object"
        ? ["grid-cols-12", smCols, mdCols, lgCols, xlCols].join(" ")
        : `grid-cols-${cols}`;

    return gridCols;
  };

  const getRowsWithSize = () => {
    const smRows = typeof rows === "object" ? RowSmSizes[rows.sm!] : ``;
    const mdRows = typeof rows === "object" ? RowMdSizes[rows.md!] : ``;
    const lgRows = typeof rows === "object" ? RowLgSizes[rows.lg!] : ``;
    const xlRows = typeof rows === "object" ? RowXlSizes[rows.xl!] : ``;

    const gridRows =
      typeof rows === "object"
        ? ["grid-rows-12", smRows, mdRows, lgRows, xlRows].join(" ")
        : `grid-rows-${rows}`;

    return gridRows;
  };

  const getGapWithSize = () => {
    const smGap = typeof gap === "object" ? GapSmSizes[gap.sm!] : ``;
    const mdGap = typeof gap === "object" ? GapMdSizes[gap.md!] : ``;
    const lgGap = typeof gap === "object" ? GapLgSizes[gap.lg!] : ``;
    const xlGap = typeof gap === "object" ? GapXlSizes[gap.xl!] : ``;

    const gridGap =
      typeof gap === "object"
        ? ["gap-4", smGap, mdGap, lgGap, xlGap].join(" ")
        : `gap-${gap}`;

    return gridGap;
  };

  const gridCols = getColsWithSize();
  const gridRows = getRowsWithSize();
  const gridGap = getGapWithSize();

  return (
    <div
      className={`grid ${gridGap}  ${gridCols} ${gridRows} ${gridFlowClass} ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default Grid;
