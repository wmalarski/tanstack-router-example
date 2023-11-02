import type { Beer } from "@services/types";
import { useState } from "react";

type BeerListItemProps = {
  beer: Beer;
};

export const Example = ({ beer }: BeerListItemProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount((current) => current + 1);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
            setCount((current) => current + 1);
          }, 100);
        }}
      >
        Add2
      </button>
      <span>{count}</span>
    </div>
  );
};
