import { Params } from "@remix-run/react";

export function getLang(params: Params<string>) {
  const lang = params.lang ?? "en";
  if (lang !== "ja" && lang !== "en") {
    throw new Error(`Invalid language ${lang}`);
  }
  return lang;
}
