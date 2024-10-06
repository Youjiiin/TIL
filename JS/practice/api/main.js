const apiKey = '';
const apiUrl = 'https://newsapi.org/v2/everything?q=';

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        searchNews(query);
    }
});

function searchNews(query) {
    const url = `${apiUrl}${query}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayNews(data.articles))
        .catch(error => console.error('Error:', error));
}

function displayNews(articles) {
    const newsResults = document.getElementById('newsResults');
    newsResults.innerHTML = '';

    if (articles.length === 0) {
        newsResults.innerHTML = '<p>No news found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';

        const moreLink = document.createElement('a');
        moreLink.href = article.url;
        moreLink.target = '_blank';
        moreLink.textContent = 'more';

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        if (article.url) {
            newsItem.appendChild(moreLink);
        }

        newsResults.appendChild(newsItem);
    });
}
