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
} from './contants';

const Grid = ({
  children,
  cols,
  gap,
  rows,
  className,
  gridFlow,
}: GridProps) => {
  const gridFlowClass = gridFlow ? `grid-flow-${gridFlow}` : '';

  const colsIsNumber = typeof cols === 'number';
  const rowsIsNumber = typeof rows === 'number';
  const gapIsNumber = typeof gap === 'number';

  const getColsWithSize = () => {
    const smCols = !colsIsNumber ? SmSizes[cols?.sm!] : ``;
    const mdCols = !colsIsNumber ? MdSizes[cols?.md!] : ``;
    const lgCols = !colsIsNumber ? LgSizes[cols?.lg!] : ``;
    const xlCols = !colsIsNumber ? XlSizes[cols?.xl!] : ``;

    const gridCols = !colsIsNumber
      ? ['grid-cols-12', smCols, mdCols, lgCols, xlCols].join(' ')
      : `grid-cols-${cols}`;

    return gridCols;
  };

  const getRowsWithSize = () => {
    const smRows = !rowsIsNumber ? RowSmSizes[rows?.sm!] : ``;
    const mdRows = !rowsIsNumber ? RowMdSizes[rows?.md!] : ``;
    const lgRows = !rowsIsNumber ? RowLgSizes[rows?.lg!] : ``;
    const xlRows = !rowsIsNumber ? RowXlSizes[rows?.xl!] : ``;

    const gridRows = !rowsIsNumber
      ? ['grid-rows-12', smRows, mdRows, lgRows, xlRows].join(' ')
      : `grid-rows-${rows}`;

    return gridRows;
  };

  const getGapWithSize = () => {
    const smGap = !gapIsNumber ? GapSmSizes[gap?.sm!] : ``;
    const mdGap = !gapIsNumber ? GapMdSizes[gap?.md!] : ``;
    const lgGap = !gapIsNumber ? GapLgSizes[gap?.lg!] : ``;
    const xlGap = !gapIsNumber ? GapXlSizes[gap?.xl!] : ``;

    const gridGap = !gapIsNumber
      ? ['gap-4', smGap, mdGap, lgGap, xlGap].join(' ')
      : `gap-${gap}`;

    return gridGap;
  };

  const gridCols = getColsWithSize();
  const gridRows = getRowsWithSize();
  const gridGap = getGapWithSize();

  return (
    <div
      className={`grid ${gridGap}  ${gridCols} ${gridRows} ${gridFlowClass} ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
};

export default Grid;
