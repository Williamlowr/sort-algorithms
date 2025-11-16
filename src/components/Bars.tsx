import React from "react";

export default function Bars({
  values,
  active,
}: {
  values: number[];
  // highlights which bars are currently being compared/swapped/pivoted
  active: {
    i?: number;
    j?: number;
    pivot?: number;
    operation?: "compare" | "swap" | "write" | "pivot";
  };
}) {
  // find the maximum value to scale height of bars
  const max = Math.max(1, ...values);

  // choose a color for current bars based on the performed operation

  return (
    <div className="relative h-64 w-full border rounded-lg overflow-hidden bg-slate-800">
      <div className="absolute inset-0 flex items-end gap-0.5 px-2 pt-10">
        {values.map((value, index) => {
          // scale height to percentage
          const h = (value / max) * 100;

          // check if this bar is involved in the current operation
          const operation = active.operation;
          const isCompareActive = operation === "compare" && index === active.i;
          const isSwapActive =
            (operation === "swap" || operation === "write") &&
            (index === active.i || index === active.j);
          const isPivotActive =
            typeof active.pivot === "number" && index === active.pivot;
          const isActive = isCompareActive || isSwapActive || isPivotActive;

          let color;

          if (isPivotActive) {
            color = "bg-emerald-400"; // pivot green
          } else if (operation === "swap" || operation === "write") {
            color = "bg-fuchsia-400"; // swap/write pink
          } else if (operation === "compare") {
            color = "bg-sky-400"; // compare blue
          } else {
            color = "bg-zinc-200"; // default
          }
          return (
            <div
              key={index}
              className={[
                "flex-1 rounded-sm",
                "transition-transform duration-10 ease-out",
                isActive ? "ring-red-600 ring-2" : "",
              ].join(" ")}
              style={{
                height: `${h}%`,
                transform: isActive ? "translateY(-4%)" : "translateY(0)",
              }}
            >
              <div
                className={[
                  "w-full h-full transition-colors duration-180 ease-out",
                  isActive ? color : "bg-zinc-200",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
