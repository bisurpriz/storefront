'use client';
import { useState } from 'react';
import AccordionItem from './AccordionItem';

interface AccordionProps {
  items: {
    title: React.ReactNode;
    content: React.ReactNode;
    className?: string;
  }[];
  className?: string;
  bordered?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  className,
  bordered,
}) => {
  const [accordionData, setAccordionData] = useState(
    items.map(() => ({ isOpen: false }))
  );

  const handleToggle = (index: number) => {
    setAccordionData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className={`mx-auto group ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          className={item.className}
          key={index}
          title={item.title}
          content={item.content}
          isOpen={accordionData[index].isOpen}
          onToggle={() => handleToggle(index)}
          bordered={bordered}
        />
      ))}
    </div>
  );
};

export default Accordion;
