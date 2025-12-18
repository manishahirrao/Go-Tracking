// Smooth scroll to top for hash router navigation
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Handle hash changes for smooth scrolling
export const handleHashChange = () => {
  setTimeout(() => {
    scrollToTop();
  }, 100);
};
