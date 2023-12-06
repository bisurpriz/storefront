import React from "react";

type ProductDescriptionProps = {
  title: string;
  description: string;
  notes?: string[];
  specifications?: {
    name: string;
    value: string;
  }[];
};

const ProductDescription = ({
  description,
  title,
  notes,
  specifications,
}: ProductDescriptionProps) => {
  return (
    <div
      className="py-8 px-4 rounded-lg border border-slate-200"
      id="description"
      aria-labelledby="description"
      aria-describedby="Ürün açıklaması"
    >
      <h2 className="text-xl font-medium font-mono mb-4 text-slate-700">
        {title}
      </h2>
      <p className="text-sm font-light tracking-wide text-slate-700">
        {description}
      </p>
      {notes && notes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium font-mono mb-2 text-slate-700">
            Notlar
          </h3>
          <ul className="list-disc list-inside text-sm font-light tracking-wide text-slate-700">
            {notes?.map((note, index) => (
              <li key={`${note}-${index}`}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {specifications && specifications.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-medium font-mono mb-2 text-slate-700">
            Özellikler
          </h3>
          <table className="table-auto text-sm font-light tracking-wide text-slate-700">
            <tbody>
              {specifications?.map((specification, index) => (
                <tr key={`${specification.name}-${index}`}>
                  <td className="border px-4 py-2 font-semibold capitalize">
                    {specification.name}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {specification.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
