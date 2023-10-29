
const searchForm = document.getElementById('search-form');
const imageContainer = document.getElementById('image-container');

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const searchQuery = searchForm.querySelector('input[name="searchQuery"]').value;
    
    if (searchQuery) {
        const apiKey = '40245726-79ec486d411d0a8bb323ae989';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=false`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.hits) {
                displayImages(data.hits);
            } else {
                imageContainer.innerHTML = 'No results found.';
            }
        } catch (error) {
            console.error(error);
        }
    }
});

function displayImages(images) {
    imageContainer.innerHTML = '';

    images.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        const likes = document.createElement('p');
        likes.textContent = `Likes: ${image.likes}`;

        const views = document.createElement('p');
        views.textContent = `Views: ${image.views}`;

        imageCard.appendChild(img);
        imageCard.appendChild(likes);
        imageCard.appendChild(views);
        imageContainer.appendChild(imageCard);
    });
}
let page = 1;
const perPage = 40;


searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    page = 1; 
    searchImages();
});


const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.style.display = 'none';

loadMoreButton.addEventListener('click', function () {
    page += 1; 
    searchImages();
});


async function searchImages() {
    const searchQuery = searchForm.querySelector('input[name="searchQuery"]').value;

    if (searchQuery) {
        const apiKey = '40245726-79ec486d411d0a8bb323ae989';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=false&page=${page}&per_page=${perPage}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.hits.length > 0) {
                if (page === 1) {
                    imageContainer.innerHTML = ''; 
                }

                displayImages(data.hits);

                if (data.hits.length < perPage) {
                    loadMoreButton.style.display = 'none'; 
                    if (page === 1) {
                        alert("We're sorry, but you've reached the end of search results.");
                    }
                } else {
                    loadMoreButton.style.display = 'block';
                }
            } else {
                alert("Sorry, there are no images matching your search query. Please try again.");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
