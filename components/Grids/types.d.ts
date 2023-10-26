enum GridBreakpoint {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ColumnSize = GridSize | { [key in GridBreakpoint]?: GridSize };
type RowSize = GridSize | { [key in GridBreakpoint]?: GridSize };
type GapSize = GridSize | { [key in GridBreakpoint]?: GridSize };

interface GridItemProps {
  children: React.ReactNode;
  colSpan?: GridSize | ColumnSize;
  rowSpan?: GridSize | RowSize;
  className?: string;
}

interface GridProps {
  cols?: GridSize | ColumnSize;
  rows?: GridSize | RowSize;
  gap?: GridSize | GapSize;
  children?: React.ReactNode;
  className?: string;
  gridFlow?: "dense" | "row" | "col";
}
