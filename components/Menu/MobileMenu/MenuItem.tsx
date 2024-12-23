import ChevronDown from "@/components/Icons/ChevronDown";
import { Link } from "@/components/Link";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const MenuItem = ({ link, text, icon, subMenuItems }: MenuItem) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const toggle = () => setIsCollapse(!isCollapse);

  const textClasses = "text-lg font-normal mt-2 text-slate-500";

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div role="menuitem" className={`${textClasses} py-2`}>
      <Link
        href={link ?? "#"}
        onClick={() => {
          toggle();
        }}
        className="hover:text-primary-light flex items-center justify-between transition-colors duration-300"
      >
        <div className="flex items-center">
          <div className="flex h-6 w-6 items-center justify-center">
            {icon ?? null}
          </div>
          {text}
        </div>
        {subMenuItems?.length ? (
          <ChevronDown
            className={`ml-2 h-4 w-4 ${!isCollapse ? "-rotate-90" : "rotate-0"} transform transition-all duration-300 ease-in-out`}
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
