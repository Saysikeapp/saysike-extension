"use client";

import React, { useState, useEffect } from "react";
import type { JSX } from "react";
import { ReactSVG, Props } from "react-svg";

import { cn } from "../../utils/classnames";
import { TypeIconCDNProps, iconSizeArray } from "./Icon.types";

const SVG_PROPS: Omit<Partial<Props>, "ref"> = {
  wrapper: "div",
};

const FALLBACK = (folder: string) =>
  function IconToReactSVG(): JSX.Element {
    return (
      <ReactSVG
        {...SVG_PROPS}
        // @todo: un-hardcode cdn url?
        src={`https://cdn.saysike.com/${folder ? folder + "/" : ""}default.svg`}
        className="icon-stroke-none"
      />
    );
  };

const beforeInjection =
  (props: TypeIconCDNProps) =>
  (svg: SVGSVGElement): void => {
    const size =
      (!props.width && !props.height && { width: 18, height: 18 }) || undefined;
    svg.setAttribute(
      "style",
      `width: ${
        props.width ||
        (svg.width as unknown as { baseVal: { value: number } })?.baseVal
          ?.value ||
        size?.width
      }px; height: ${
        props.height ||
        (svg.height as unknown as { baseVal: { value: number } })?.baseVal
          ?.value ||
        size?.height
      }px; ${props.maxWidth ? "max-width: " + props.maxWidth + "px; " : ""}${
        props.maxWidth ? "max-height: " + props.maxHeight + "px; " : ""
      }`,
    );
  };

const ensureNoPreSlash = (str: string): string =>
  str.substring(0, 1) === "/" ? str.substring(1) : str;

const ensureIconFolder = (str: string): string =>
  !str.includes("/") ? "solid/" + str : str;

const iconsSize = iconSizeArray.reduce<{
  [key: string]: { width: number; height: number };
}>((acc, key) => {
  acc[String(key)] = { width: Number(key) * 4, height: Number(key) * 4 };
  return acc;
}, {});

const Icon = React.memo(function IconCDN(props: TypeIconCDNProps) {
  const { id, className, wrapperProps, size = 4 } = props;

  let { src = "", width, height = 16 } = props;

  width = props.size ? iconsSize[String(size)]?.width : width || height;
  height = props.size ? iconsSize[String(size)]?.height : height || width;

  src = ensureIconFolder(ensureNoPreSlash(src));

  const CDN_URL = "https://cdn.saysike.com";
  const url = `${CDN_URL}/${src}`;

  const rest = url.replace(CDN_URL + "/", "");
  const folder = rest.substring(0, rest.lastIndexOf("/"));
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // One-time connection warmup to the CDN origin.
  // This avoids per-icon preload warnings and still speeds up SVG fetches.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const href = CDN_URL;

    const ensureLink = (rel: "preconnect" | "dns-prefetch"): void => {
      const existing = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"][href="${href}"]`,
      );
      if (existing) return;

      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;

      // CloudFront is cross-origin; this enables proper credentialless preconnect.
      if (rel === "preconnect") link.crossOrigin = "anonymous";

      document.head.appendChild(link);
    };

    ensureLink("dns-prefetch");
    ensureLink("preconnect");
  }, []);

  return (
    <>
      <div
        className={cn(
          "icon icon--cdn rounded-sm",
          {
            "bg-text-tertiary/10 animate-pulse": !loaded,
            "bg-text-tertiary/10": notFound,
            "cursor-pointer": props.onClick,
          },
          className,
        )}
        style={{ width: `${width}px`, height: height ? `${height}px` : "" }}
        onClick={props.onClick}
      >
        <ReactSVG
          {...SVG_PROPS}
          fallback={() => {
            // eslint-disable-next-line no-console
            console.error("Cannot find icon: ", src);
            setNotFound(true);
            setLoaded(true);
            return FALLBACK(folder)();
          }}
          src={url}
          {...wrapperProps}
          width={width}
          id={id}
          beforeInjection={() => {
            setLoaded(true);
            beforeInjection({ ...props, height, width });
          }}
          className={cn(wrapperProps?.className)}
        />
      </div>
    </>
  );
});

Icon.displayName = "Icon";

export default Icon;
