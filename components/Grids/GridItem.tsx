import React from "react";
import {
  ColSpanSmSizes,
  ColSpanLgSizes,
  ColSpanMdSizes,
  ColSpanXlSizes,
  RowSpanLgSizes,
  RowSpanMdSizes,
  RowSpanSmSizes,
  RowSpanXlSizes,
} from "./contants";

const GridItem = ({ children, colSpan, rowSpan, className }: GridItemProps) => {
  const colSpanIsNumber = typeof colSpan === "number";
  const rowSpanIsNumber = typeof rowSpan === "number";

  const getColSpanWithSizes = () => {
    const smColSpan = !colSpanIsNumber ? ColSpanSmSizes[colSpan?.sm!] : ``;
    const mdColSpan = !colSpanIsNumber ? ColSpanMdSizes[colSpan?.md!] : ``;
    const lgColSpan = !colSpanIsNumber ? ColSpanLgSizes[colSpan?.lg!] : ``;
    const xlColSpan = !colSpanIsNumber ? ColSpanXlSizes[colSpan?.xl!] : ``;

    const arr = ["col-span-auto", smColSpan, mdColSpan, lgColSpan, xlColSpan];

    const gridColSpans = colSpan
      ? arr.filter((item) => item !== "").join(" ")
      : "";

    return gridColSpans;
  };

  const getRowSpanWithSizes = () => {
    const smRowSpan = !rowSpanIsNumber ? RowSpanSmSizes[rowSpan?.sm!] : ``;
    const mdRowSpan = !rowSpanIsNumber ? RowSpanMdSizes[rowSpan?.md!] : ``;
    const lgRowSpan = !rowSpanIsNumber ? RowSpanLgSizes[rowSpan?.lg!] : ``;
    const xlRowSpan = !rowSpanIsNumber ? RowSpanXlSizes[rowSpan?.xl!] : ``;

    const arr = ["row-span-auto", smRowSpan, mdRowSpan, lgRowSpan, xlRowSpan];

    const gridRowSpans = rowSpan
      ? arr.filter((item) => item !== "").join(" ")
      : "";

    return gridRowSpans;
  };

  const gridColSpans = getColSpanWithSizes();
  const gridRowSpans = getRowSpanWithSizes();

  return (
    <div className={`${gridColSpans} ${gridRowSpans} ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default GridItem;
