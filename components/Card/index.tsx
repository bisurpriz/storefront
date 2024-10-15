import Divider from "../Divider";

const Card = ({
  children,
  title,
  wrapperClass,
  titleClass,
  contentClass,
  bordered = true,
  onClick,
}: {
  children: React.ReactNode;
  title?: string;
  wrapperClass?: string;
  titleClass?: string;
  contentClass?: string;
  bordered?: boolean;
  onClick?: () => void;
}) => {
  const isBordered = bordered ? "border rounded-md border-slate-200" : "";
  const containerCls = wrapperClass ?? "";
  const titleCls = titleClass ?? "";
  const contentCls = contentClass ?? "";

  return (
    <div className={`${isBordered} ${containerCls}`} onClick={onClick}>
      {title && (
        <div
          className={`text-center text-md font-bold text-gray-700 p-4 ${titleCls}`}
        >
          {title}
        </div>
      )}
      {title && <Divider orientation="horizontal" />}
      <div className={`p-4 ${contentCls}`}>{children}</div>
    </div>
  );
};

export default Card;
