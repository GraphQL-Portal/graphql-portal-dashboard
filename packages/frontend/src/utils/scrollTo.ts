export const scrollTo = (top = document?.body?.scrollHeight) => {
  window.scrollTo({
    top: document?.body?.scrollHeight,
    behavior: 'smooth',
  });
};
