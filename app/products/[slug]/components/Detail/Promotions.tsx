import React from "react";
import { HiOutlineTicket } from "react-icons/hi";

const Promotions = () => {
  return (
    <div className="grid grid-cols-12 mb-2 p-3 gap-2 bg-sky-100 text-sky-600 rounded-lg">
      <HiOutlineTicket className="col-span-1 self-center text-xl" />
      <p className="col-span-11">
        Promosyon mesajları bu kısımda görünecek, bold kısımlar strong olacak ve
        HTML olarak serverdan gelecek.
      </p>
    </div>
  );
};

export default Promotions;
