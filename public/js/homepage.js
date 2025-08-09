let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}
/*SEARCH*/
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-box input');
  const searchBox = document.querySelector('.search-box');
  const productCards = document.querySelectorAll('.product-card');


  const noResultsMessage = document.createElement('div');
  noResultsMessage.textContent = 'No matches found.';
  noResultsMessage.classList.add('no-results');
  noResultsMessage.style.display = 'none';
  searchBox.appendChild(noResultsMessage);

 
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    let anyMatch = false;

    productCards.forEach(card => {
      const titleEl = card.querySelector('.product-title');
      const descEl = card.querySelector('.product-description');

      const titleText = titleEl.textContent;
      const descText = descEl.textContent;

      const inTitle = titleText.toLowerCase().includes(query);
      const inDesc = descText.toLowerCase().includes(query);

      if (query && (inTitle || inDesc)) {
        card.style.display = 'block';
        titleEl.innerHTML = highlightText(titleText, query);
        descEl.innerHTML = highlightText(descText, query);
        anyMatch = true;
      } else if (!query) {
        card.style.display = 'block';
        titleEl.textContent = titleText;
        descEl.textContent = descText;
        anyMatch = true;
      } else {
        card.style.display = 'none';
        titleEl.textContent = titleText;
        descEl.textContent = descText;
      }
    });
    if (!anyMatch && query) {
      noResultsMessage.style.display = 'block';
    } else {
      noResultsMessage.style.display = 'none';
    }
  });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBox.style.display = 'none';
      searchInput.blur();
    }
  });
  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
});