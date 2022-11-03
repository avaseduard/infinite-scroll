const imageContainer = document.getElementById('img-cont');
const loadingSpinner = document.getElementById('spinner');
let imagesArray = [];
let loadMore = false;
let loadedImages = 0;

// Helper function to set attributes to an element
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Find out if images are loaded and ask to load more
const imageLoaded = function () {
  loadedImages++;
  loadingSpinner.hidden = true;
  if (loadedImages === imagesArray.length) {
    loadMore = true;
    loadedImages = 10;
  }
};

// Displaying the photos from unsplash API
const renderImages = function () {
  loadedImages = 0; // resetting the loadedImages to 0 every time we hit the loading scroll point

  imagesArray.forEach(image => {
    // Creating anchor element that links to unsplash
    const anchor = document.createElement('a');
    // anchor.setAttribute('href', image.links.html);
    // anchor.setAttribute('target', '_blank');
    setAttributes(anchor, {
      href: image.links.html,
      target: '_blank',
    });

    // Creating img element with the image from unsplash
    const img = document.createElement('img');
    // img.setAttribute('src', image.urls.regular);
    // img.setAttribute('alt', image.description);
    // img.setAttribute('title', image.description);
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.description,
      title: image.description,
    });

    // Checking when images have loaded
    img.addEventListener('load', imageLoaded);

    // Introducing <img> in <a> and both in <div>
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
};

// Fetching photos from the unsplash API
const photosCount = 5;
const unsplashKey = 'k3DPe1yruXCPdPzlCRhPXAyljd-K1HRMQaaTrKQxwBc';
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashKey}&count=${photosCount}`;

const fetchPhotos = async function () {
  try {
    const response = await fetch(unsplashUrl);
    imagesArray = await response.json();
    renderImages();
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadMore
  ) {
    loadMore = false;
    fetchPhotos();
  }
});

// Initialize
fetchPhotos();
