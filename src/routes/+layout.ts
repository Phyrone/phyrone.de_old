const USE_TRAILING_SLASH = import.meta.env.BUILD_TRAILING_SLASH == "true";

export const prerender = true;
export const trailingSlash = USE_TRAILING_SLASH ? 'always' : 'never';
