export const BASEURL = process.env.REACT_APP_API_CONTENT_URL;

export const ENDPOINTS = {
  login: `${BASEURL}/login`,
  logout: `${BASEURL}/loguot`,
  signup: `${BASEURL}/create-account`,
  post1: `${BASEURL}/posts/1`,
  post2: `${BASEURL}/posts/2`,
  post3: `${BASEURL}/posts/3`,
  CONENT: {
    HOMEPAGE: `${BASEURL}/getWebSiteContent?title=HOME`,
    WHOWEARE: `${BASEURL}/getWebSiteContent?title=WHO_WE_ARE`,
    WHATWEDO: `${BASEURL}/getWebSiteContent?title=WHAT_WE_DO`,
    WHYBBO: `${BASEURL}/getWebSiteContent?title=WHY_BBO`,
  },
};

export const profile = {
  //'abc':'/xyz/',
};
