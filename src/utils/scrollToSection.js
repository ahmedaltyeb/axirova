/**
 * Scrolls to an in-page section by id. If not already on the home route,
 * navigates there first and polls for the (lazy-loaded) section to mount
 * before scrolling — a fixed short delay isn't enough once route-splitting
 * means the target section's chunk still has to fetch.
 */
export function scrollToSection(navigate, location, id) {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (location.pathname === '/') {
    scroll();
    return;
  }

  navigate('/');
  let attempts = 0;
  const tryScroll = () => {
    if (document.getElementById(id)) {
      scroll();
    } else if (attempts < 30) {
      attempts++;
      setTimeout(tryScroll, 100);
    }
  };
  setTimeout(tryScroll, 50);
}
