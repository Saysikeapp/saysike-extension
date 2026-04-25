import React, { MouseEventHandler } from "react";
import { Props } from "react-svg";

import { TIconSrc } from "./icons-generated";

export type TypeIconCDNProps = {
  src: TIconSrc;
  wrapperProps?: Omit<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    Exclude<keyof Props, "style" | "className">
  >;
  className?: string;
  id?: string;
  width?: number | string;
  height?: number | string;

  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  size?: TIconSize;
  maxWidth?: number | string;
  maxHeight?: number | string;
};

export const iconSizeArray = [
  1,
  "1",
  1.5,
  "1.5",
  2,
  "2",
  2.5,
  "2.5",
  3,
  "3",
  3.5,
  "3.5",
  4,
  "4",
  4.5,
  "4.5",
  5,
  "5",
  5.5,
  "5.5",
  6,
  "6",
  6.5,
  "6.5",
  7,
  "7",
  7.5,
  "7.5",
  8,
  "8",
  8.5,
  "8.5",
  9,
  "9",
  9.5,
  "9.5",
  10,
  "10",
  20,
  "20",
  30,
  "30",
  40,
  "40",
  50,
  "50",
  60,
  "60",
  70,
  "70",
  80,
  "80",
] as const;

export type TIconSize = (typeof iconSizeArray)[number];
