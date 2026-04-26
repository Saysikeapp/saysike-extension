// Sub region URL Paths (e.g. if path contains /uk, will assign region identifier.)

type TRegionsDict = {
  [key: string]: string[];
};

const regionsDict: TRegionsDict = {
  DE: ["de", "eu"],
  ES: ["es"],
  FR: ["fr"],
  GB: ["en", "uk", "gb", "en-uk", "en-gb"],
  IE: ["ie"],
};

const sitesToIgnore = [
  "",
  "chrome-extension:",
  "google.com",
  "youtube.com",
  "twitch.tv",
  "facebook.com",
  "twitter.com",
  "wikipedia.org",
  "instagram.com",
  "baidu.com",
  "yahoo.com",
  "reddit.com",
  "bing.com",
  "pinterest.com",
  "netflix.com",
  "chatgpt.com",
];

export const filterAndFormatDomain = (www: string): string => {
  let domain = www.replace(/(^\w+:|^)\/\//, "");
  domain = domain.replace(/^(www\.)/, "");
  domain = domain.replace(/^(WWW\.)/, "");
  domain = domain.replace(/\/+$/, "");

  // a system to split sites by regional paths, DO NOT CHANGE, this is formatted with the backend.

  const pathFinder = domain.split("/");

  if (!pathFinder[0]) return "";

  // don't bother requesting on common unrelated sites.
  if (sitesToIgnore.includes(pathFinder[0]) || !domain) return "";

  if (pathFinder.length > 1 && typeof pathFinder[1] === "string") {
    for (const k in regionsDict) {
      if (regionsDict[k]?.includes(pathFinder[1])) {
        return pathFinder[0] + "-" + pathFinder[1];
      }
    }
  }

  return pathFinder[0];
};
