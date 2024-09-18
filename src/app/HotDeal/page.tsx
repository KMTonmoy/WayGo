import React from "react";

const HotDeal: React.FC = () => {
  return (
    <div className="flex px-14 mt-8 justify-between">
      <div>
        <h4>Hot Deals</h4>
      </div>
      <div className="">
        <ul className="flex gap-4 px-3 py-2 justify-between bg-[var(--clr-white)] rounded-full">
          <li className="hover:bg-slate-300 hover:rounded-full px-3 py-1">
            All
          </li>
          <li className="hover:bg-slate-300 hover:rounded-full px-3 py-1">
            Bus
          </li>
          <li className="hover:bg-slate-300 hover:rounded-full px-3 py-1">
            Train
          </li>
          <li className="hover:bg-slate-300 hover:rounded-full px-3 py-1">
            Flight
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HotDeal;
