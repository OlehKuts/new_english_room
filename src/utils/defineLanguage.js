export const defineLanguage = (languageName, ...args) => {
  const finalLanguage = args.find((item) => item.language === languageName);
  return finalLanguage?.data;
};
