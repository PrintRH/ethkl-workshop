"use client";

import React, { useState } from "react";
import { formatEther } from "viem";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PriceReader = () => {
  const [isEther, setIsEther] = useState(false);

  const { data: price } = useScaffoldReadContract({
    contractName: "API3PriceFeed",
    functionName: "readDataFeed",
  });

  const asNumber = Number(price);
  if (asNumber <= Number.MAX_SAFE_INTEGER && asNumber >= Number.MIN_SAFE_INTEGER) {
    return String(price);
  }

  const priceFeedData = price ? price[0] : null;
  console.log("Price of USD/ETH: ", priceFeedData);

  return (
    <div>
      <h2>USD/ETH Price:</h2>
      {isEther
        ? "$" + formatEther(priceFeedData ? priceFeedData : BigInt(0))
        : String(`${priceFeedData ? priceFeedData : BigInt(0)} wei`)}
      <span
        className="tooltip tooltip-secondary font-sans ml-2"
        data-tip={isEther ? "Multiply by 1e18" : "Divide by 1e18"}
      >
        <button className="btn btn-ghost btn-circle btn-xs" onClick={() => setIsEther(!isEther)}>
          <ArrowsRightLeftIcon className="h-3 w-3 opacity-65" />
        </button>
      </span>
    </div>
  );
};

export default PriceReader;
