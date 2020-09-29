import gallery from './gallery-items.js';

const refLightBox = document.querySelector('.lightbox');
const refPopupImg = document.querySelector('.lightbox___image');
const refCloseBtn = document.querySelector(
  'button[data-action=close-lightbox]',
);
const refOverlay = document.querySelector('.lightbox__content');

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const listPhoto = document.querySelector('.js-gallery');
const photoMarkup = createPhotoMarkup(gallery);

listPhoto.insertAdjacentHTML('beforeend', photoMarkup);

console.log(createPhotoMarkup(gallery));

function createPhotoMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
       <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

const openPopUp = event => {
  if (event.target === event.currentTarget) {
    return;
  }
  event.preventDefault();
  refLightBox.classList.add('is-open');
  refPopupImg.setAttribute('src', `${event.target.getAttribute('src')}`);
};

const closePopUp = event => {
  if (
    refLightBox.classList.contains('is-open') &&
    event.target !== refPopupImg
  ) {
    refLightBox.classList.remove('is-open');
  }
  return;
};

const closeByKey = event => {
  if (event.keyCode === 27) refLightBox.classList.remove('is-open');
};

listPhoto.addEventListener('click', openPopUp);

refCloseBtn.addEventListener('click', closePopUp);
refOverlay.addEventListener('click', closePopUp);
document.addEventListener('keydown', closeByKey);
