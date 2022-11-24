const getExtensionFromUrl = (url: string) => {
  return url.split('.').pop();
};

export default getExtensionFromUrl;
