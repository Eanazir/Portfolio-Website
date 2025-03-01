import { cn } from "@/lib/utils";
import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 10
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="var(--accentColor)"
            strokeWidth="3"
            strokeOpacity="0.7"
            style={{
              filter: "drop-shadow(0 0 5px var(--accentColor))"
            }}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                zIndex: 20
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
