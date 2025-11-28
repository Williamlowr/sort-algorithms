import { useRef } from "react";

export default function Bars({
  values,
  active,
}: {
  values: number[];
  active: {
    i?: number;
    j?: number;
    pivot?: number;
    operation?: "compare" | "swap" | "write" | "pivot";
  };
}) {
  const max = Math.max(1, ...values);

  const barRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative h-64 w-full border rounded-lg overflow-hidden bg-slate-800">
      <div className="absolute inset-0 flex items-end gap-0.5 px-2 pt-10">
        {values.map((value, index) => {
          const h = (value / max) * 100;
          const operation = active.operation;

          const isCompare =
            operation === "compare" &&
            (index === active.i || index === active.j);
          const isSwap =
            operation === "swap" && (index === active.i || index === active.j);
          const isWrite =
            operation === "write" && (index === active.i || index === active.j);
          const isPivot = operation === "pivot" && index === active.pivot;

          const isActive = isCompare || isSwap || isWrite || isPivot;

          let color;

          if (index === active.pivot) {
            color = "bg-emerald-400";
          } else if (operation === "swap") {
            color = "bg-fuchsia-400";
          } else if (operation === "write") {
            color = "bg-amber-400";
          } else if (operation === "compare") {
            color = "bg-sky-400";
          } else {
            color = "bg-zinc-200";
          }

          // slide distance for swaps
          let swapTransform = "";
          if (operation === "swap" && barRef.current) {
            const barWidth = barRef.current.offsetWidth + 2;

            if (index === active.i && typeof active.j === "number") {
              swapTransform = `translateX(${
                (active.j - active.i) * barWidth
              }px)`;
            } else if (index === active.j && typeof active.i === "number") {
              swapTransform = `translateX(${
                (active.i - active.j) * barWidth
              }px)`;
            }
          }

          return (
            <div
              key={index}
              ref={index === 0 ? barRef : null}
              className={[
                "flex-1 rounded-sm",
                "transition-transform duration-200 ease-out",
                isActive ? "z-10 ring-2 ring-red-500" : "z-0",
              ].join(" ")}
              style={{
                height: `${h}%`,
                transform: swapTransform,
              }}
            >
              <div
                className={[
                  "w-full h-full",
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
