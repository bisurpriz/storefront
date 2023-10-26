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
  const getColSpanWithSizes = () => {
    const smColSpan =
      typeof colSpan === "object" ? ColSpanSmSizes[colSpan.sm!] : ``;
    const mdColSpan =
      typeof colSpan === "object" ? ColSpanMdSizes[colSpan.md!] : ``;
    const lgColSpan =
      typeof colSpan === "object" ? ColSpanLgSizes[colSpan.lg!] : ``;
    const xlColSpan =
      typeof colSpan === "object" ? ColSpanXlSizes[colSpan.xl!] : ``;

    const gridColSpans = colSpan
      ? ["col-span-12", smColSpan, mdColSpan, lgColSpan, xlColSpan].join(" ")
      : "";

    return gridColSpans;
  };

  const getRowSpanWithSizes = () => {
    const smRowSpan =
      typeof rowSpan === "object" ? RowSpanSmSizes[rowSpan.sm!] : ``;
    const mdRowSpan =
      typeof rowSpan === "object" ? RowSpanMdSizes[rowSpan.md!] : ``;
    const lgRowSpan =
      typeof rowSpan === "object" ? RowSpanLgSizes[rowSpan.lg!] : ``;
    const xlRowSpan =
      typeof rowSpan === "object" ? RowSpanXlSizes[rowSpan.xl!] : ``;

    const gridRowSpans = rowSpan
      ? ["row-span-12", smRowSpan, mdRowSpan, lgRowSpan, xlRowSpan].join(" ")
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
