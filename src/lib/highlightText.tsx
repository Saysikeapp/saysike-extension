import { JSX, ReactNode } from "react";

/**
 * Splits the input text by the given regex and wraps matches in a styled JSX element.
 * @param text The input string to process.
 * @param regex The regex to match substrings.
 * @param className Tailwind className to apply to matched elements.
 * @returns An array of strings and JSX elements.
 */
export function highlightText(
  text: string,
  regex: RegExp,
  className: string,
): ReactNode[] {
  if (!regex.global) {
    regex = new RegExp(regex.source, regex.flags + "g");
  }

  const result: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    result.push(
      <span className={className} key={key++}>
        {match[0]}
      </span>,
    );
    ({ lastIndex } = regex);
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}
