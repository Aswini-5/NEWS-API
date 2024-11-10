const API_URL = 'https://newsdata.io/api/1/latest?apikey=pub_587839341a1870e5f95da651ea8881cf711cc&language=en';

// Function to fetch news data
function fetchNews() {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayNews(data.results))
    .catch(error => {
      document.getElementById('news').innerHTML = `<div class="error">Error fetching data: ${error.message}</div>`;
    });
}

// Function to display news articles
function displayNews(articles) {
  const newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<div class="error">No articles found.</div>';
    return;
  }

  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
      <h2>${article.title || 'No title available'}</h2>
      <p>${article.description || 'No description available'}</p>
      <a href="${article.link}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsItem);
  });
}

// Fetch news on page load
window.onload = fetchNews;
