const scroller = document.querySelector("main");
const sections = Array.from(document.querySelectorAll(".page-section"));

if (scroller && sections.length > 1) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const settleDelayMs = 120;
  let settleTimer;

  const getSectionOffsetTop = (section) => section.offsetTop;

  const getClosestSection = () => {
    const currentTop = scroller.scrollTop;
    let closestSection = sections[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const distance = Math.abs(getSectionOffsetTop(section) - currentTop);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    return closestSection;
  };

  const snapToClosestIfNeeded = () => {
    const closestSection = getClosestSection();
    const targetTop = getSectionOffsetTop(closestSection);
    const distance = Math.abs(scroller.scrollTop - targetTop);

    if (distance < 2) {
      return;
    }

    scroller.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  scroller.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snapToClosestIfNeeded, settleDelayMs);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(snapToClosestIfNeeded, settleDelayMs);
  });
}
