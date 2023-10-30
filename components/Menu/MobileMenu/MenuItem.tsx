import Link from "next/link";
import React from "react";
import { PiCaretDownBold } from "react-icons/pi";
import { CSSTransition } from "react-transition-group";

const MenuItem = ({ link, text, icon, subMenuItems }: MenuItem) => {
  const [isCollapse, setIsCollapse] = React.useState(false);

  const toggle = () => setIsCollapse(!isCollapse);

  const textClasses = "text-lg font-normal mt-2 text-slate-500";

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div role="menuitem" className={`${textClasses}  py-2 `}>
      <Link
        href={link ?? "#"}
        onClick={(e) => {
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
          <PiCaretDownBold
            className={`w-4 h-4 ml-2 ${!isCollapse ? "-rotate-90" : "rotate-0"}
                transition-all duration-300 ease-in-out transform
            `}
          />
        ) : null}
      </Link>
      <CSSTransition
        in={isCollapse}
        timeout={300}
        classNames={{
          enter: "accordion-content-enter",
          enterActive: "accordion-content-enter-active",
          exit: "accordion-content-exit",
          exitActive: "accordion-content-exit-active",
        }}
        unmountOnExit
        nodeRef={ref}
      >
        <div ref={ref} className="ml-6">
          {subMenuItems?.length &&
            subMenuItems.map((item) => {
              return <MenuItem key={item.link} {...item} />;
            })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default MenuItem;
