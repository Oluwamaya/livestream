export function getUrlParams(url = window.location.href) {
    const queryString = url.split('?')[1];
    return new URLSearchParams(queryString);
  }