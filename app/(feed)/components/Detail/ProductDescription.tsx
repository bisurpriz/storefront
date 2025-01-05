import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AlertCircle, InfoIcon, ListChecks } from "lucide-react";
import { FC } from "react";

type ProductDescriptionProps = {
  description: string;
  notes?: string[];
  specifications?: {
    name: string;
    value: string;
  }[];
};

const ProductDescription: FC<ProductDescriptionProps> = ({
  description,
  notes,
  specifications,
}) => {
  const hasNotes = notes && notes.length > 0;
  const hasSpecs = specifications && specifications.length > 0;

  return (
    <div id="description" className="w-full">
      <Accordion
        type="multiple"
        defaultValue={["description"]}
        className="space-y-4"
      >
        <AccordionItem
          value="description"
          className="overflow-hidden border-none"
        >
          <AccordionTrigger className="gap-2 py-4">
            <div className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">Ürün Açıklaması</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-sm prose-gray max-w-none prose-headings:font-semibold prose-p:text-gray-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </AccordionContent>
        </AccordionItem>

        {hasSpecs && (
          <AccordionItem value="specifications" className="border-none">
            <AccordionTrigger className="gap-2 py-4">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-semibold">Teknik Özellikler</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="overflow-hidden rounded-lg border border-gray-100">
                <div className="divide-y divide-gray-100">
                  {specifications.map((spec, index) => (
                    <div
                      key={`${spec.name}-${index}`}
                      className={cn(
                        "grid grid-cols-3 gap-4 px-4 py-3 text-sm",
                        index % 2 === 0 && "bg-gray-50/50",
                      )}
                    >
                      <dt className="font-medium text-gray-900">{spec.name}</dt>
                      <dd className="col-span-2 text-gray-700">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {hasNotes && (
          <AccordionItem value="notes" className="border-none">
            <AccordionTrigger className="gap-2 py-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="text-lg font-semibold">Önemli Notlar</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="rounded-lg border border-amber-100 bg-amber-50/50">
                <ul className="divide-y divide-amber-100">
                  {notes.map((note, index) => (
                    <li
                      key={`${note}-${index}`}
                      className="flex items-start gap-3 p-4 text-sm text-amber-900"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default ProductDescription;
