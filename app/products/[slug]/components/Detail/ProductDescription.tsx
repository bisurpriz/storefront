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
          <h3 className="text-md font-medium font-sans mb-2 text-slate-700">
            Notlar
          </h3>
          <ul className="list-disc list-inside text-sm font-light font-mono tracking-wide text-slate-700">
            {notes?.map((note, index) => (
              <li key={`${note}-${index}`}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {specifications?.length && (
        <div className="mt-4">
          <h3 className="text-md font-medium font-mono mb-2 text-slate-700">
            Özellikler
          </h3>

          <ul className="flex flex-col gap-1">
            {specifications?.map((specification, index) => (
              <li
                key={`${specification.name}-${index}`}
                className={clsx(
                  "odd:bg-amber-50 list-none w-full p-2 rounded-md even:border border-amber-100 grid grid-cols-2 font-manrope text-sm font-normal text-slate-500 "
                )}
              >
                <span
                  className={clsx(
                    "block w-full text-slate-800 relative font-semibold",
                    "w-1/2 col-span-1"
                  )}
                >
                  {specification.name}
                </span>
                <span className={clsx("block w-full", "w-1/2 col-span-1")}>
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
