import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// src/lib/utils/cn.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/lib/utils/is-route-active.ts
var ROOT_PATH = "/";
function isRouteActive(path, currentPath, end) {
  if (path === currentPath) {
    return true;
  }
  if (typeof end === "function") {
    return !end(currentPath);
  }
  const defaultEnd = end != null ? end : true;
  const oneLevelDeep = 1;
  const threeLevelsDeep = 3;
  const depth = defaultEnd ? oneLevelDeep : threeLevelsDeep;
  return checkIfRouteIsActive(path, currentPath, depth);
}
function checkIfRouteIsActive(targetLink, currentRoute, depth = 1) {
  var _a;
  const currentRoutePath = (_a = currentRoute.split("?")[0]) != null ? _a : "";
  if (!isRoot(currentRoutePath) && isRoot(targetLink)) {
    return false;
  }
  if (!currentRoutePath.includes(targetLink)) {
    return false;
  }
  const isSameRoute = targetLink === currentRoutePath;
  if (isSameRoute) {
    return true;
  }
  return hasMatchingSegments(targetLink, currentRoutePath, depth);
}
function splitIntoSegments(href) {
  return href.split("/").filter(Boolean);
}
function hasMatchingSegments(targetLink, currentRoute, depth) {
  const segments = splitIntoSegments(targetLink);
  const matchingSegments = numberOfMatchingSegments(currentRoute, segments);
  if (targetLink === currentRoute) {
    return true;
  }
  return matchingSegments > segments.length - (depth - 1);
}
function numberOfMatchingSegments(href, segments) {
  let count = 0;
  for (const segment of splitIntoSegments(href)) {
    if (segments.includes(segment)) {
      count += 1;
    } else {
      return count;
    }
  }
  return count;
}
function isRoot(path) {
  return path === ROOT_PATH;
}

export { checkIfRouteIsActive, cn, isRouteActive };
//# sourceMappingURL=chunk-WKYHJYPA.mjs.map
//# sourceMappingURL=chunk-WKYHJYPA.mjs.map