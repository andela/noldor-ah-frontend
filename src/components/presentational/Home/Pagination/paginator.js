/**
 * @param {number} pageInput
 * @returns {Array} pages
 */
function createPaginationArray(pageInput) {
  const dispLayWidth = parseInt(localStorage.getItem('message'), 10);
  const width = dispLayWidth < 5 ? dispLayWidth : 5;
  const startPage = pageInput,
    range = width,
    totalPages = parseInt(localStorage.getItem('message'), 10);
  let start = 1;

  const pages = [];

  if (startPage < (range / 2) + 1) {
    start = 1;
  } else if (startPage >= (totalPages - (range / 2))) {
    start = Math.floor(totalPages - range + 1);
  } else {
    start = (startPage - Math.floor(range / 2));
  }

  for (let i = start; i <= ((start + range) - 1); i += 1) {
    if (i === startPage) {
      pages.push(`${i}.`);
    } else {
      pages.push(i.toString());
    }
  }
  return pages;
}

export default createPaginationArray;
