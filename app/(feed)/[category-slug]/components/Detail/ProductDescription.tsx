import clsx from "clsx";

type ProductDescriptionProps = {
  description: string;
  notes?: string[];
  specifications?: {
    name: string;
    value: string;
  }[];
};

const ProductDescription = ({
  description,
  notes,
  specifications,
}: ProductDescriptionProps) => {
  return (
    <div
      id="description"
      aria-labelledby="description"
      aria-describedby="Ürün açıklaması"
    >
      {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
      {notes && notes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md mb-2 font-sans font-medium text-slate-700">
            Notlar
          </h3>
          <ul className="list-inside list-disc font-mono text-sm font-light tracking-wide text-slate-700">
            {notes?.map((note, index) => (
              <li key={`${note}-${index}`}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {specifications?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md mb-2 font-mono font-medium text-slate-700">
            Özellikler
          </h3>

          <ul className="flex flex-col gap-1">
            {specifications?.map((specification, index) => (
              <li
                key={`${specification.name}-${index}`}
                className={clsx(
                  "grid w-full list-none grid-cols-2 rounded-md border-amber-100 p-2 font-manrope text-sm font-normal text-slate-500 odd:bg-amber-50 even:border",
                )}
              >
                <span
                  className={clsx(
                    "relative block w-full font-semibold text-slate-800",
                    "col-span-1 w-1/2",
                  )}
                >
                  {specification.name}
                </span>
                <span className={clsx("block w-full", "col-span-1 w-1/2")}>
                  {specification.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
