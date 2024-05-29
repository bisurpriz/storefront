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
      <div dangerouslySetInnerHTML={{ __html: description }} />
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

      {specifications && specifications !== undefined && (
        <div className="mt-4">
          <h3 className="text-md font-medium font-mono mb-2 text-slate-700">
            Özellikler
          </h3>
          <table className="table text-sm font-light tracking-wide text-slate-700">
            <tbody>
              {specifications?.map((specification, index) => (
                <tr key={`${specification.name}-${index}`}>
                  <td className="border px-4 py-2 font-semibold capitalize text-left w-20">
                    {specification.name}
                  </td>
                  <td className="border px-4 py-2 capitalize w-20">
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
