import { Link } from "@/components/Link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ChevronDown from "@/components/Icons/ChevronDown";

const MenuItem = ({ link, text, icon, subMenuItems }: MenuItem) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const toggle = () => setIsCollapse(!isCollapse);

  const textClasses = "text-lg font-normal mt-2 text-slate-500";

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div role="menuitem" className={`${textClasses}  py-2 `}>
      <Link
        href={link ?? "#"}
        onClick={() => {
          toggle();
        }}
        className="flex items-center justify-between hover:text-primary-light transition-colors duration-300"
      >
        <div className="flex items-center">
          <div className="w-6 h-6 flex items-center justify-center">
            {icon ?? null}
          </div>
          {text}
        </div>
        {subMenuItems?.length ? (
          <ChevronDown
            className={`w-4 h-4 ml-2 ${!isCollapse ? "-rotate-90" : "rotate-0"}
                transition-all duration-300 ease-in-out transform
            `}
          />
        ) : null}
      </Link>
      <motion.div
        initial={false}
        animate={isCollapse ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        className="overflow-hidden"
        ref={ref}
      >
        {subMenuItems?.length &&
          subMenuItems.map((item) => {
            return <MenuItem key={item.link} {...item} />;
          })}
      </motion.div>
    </div>
  );
};

export default MenuItem;
