const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const container = document.querySelector('.gallery');

container.insertAdjacentHTML('beforeend', creatMarkup(images));

container.addEventListener('click', handleProductClick);

function creatMarkup(arr) {
  return arr
    .map(
      images => `<li class="item gallery-item">
        <a class="gallery-link" href="${images.original}">
          <img
            class="gallery-image"
            src="${images.preview}"
            data-source="${images.original}"
            alt="${images.description}"
          />
        </a>
      </li>`
    )
    .join('');
}

function handleProductClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }

  const img = event.target;
  const instance = basicLightbox.create(
    `
        <div class="modal">
        <img src="${img.dataset.source}" alt="${img.alt}" class="modal-img">
        </div>
        `,
    {
      onShow: instance => {
        // Додаємо обробник кліку на зображення
        instance
          .element()
          .querySelector('.modal-img')
          .addEventListener('click', modalClickHandler);
        instance
          .element()
          .querySelector('.modal')
          .addEventListener('click', modalClickHandler);
        // Додаємо обробник клавіші Escape
        window.addEventListener('keydown', escKeyPressHandler);
      },
      // Обробник перед закриттям модального вікна
      onClose: instance => {
        // Видаляємо обробник кліку на зображення
        instance
          .element()
          .querySelector('.modal-img')
          .removeEventListener('click', modalClickHandler);
        instance
          .element()
          .querySelector('.modal')
          .removeEventListener('click', modalClickHandler);
        // Видаляємо обробник клавіші Escape
        window.removeEventListener('keydown', escKeyPressHandler);
      },
    }
  );

  instance.show();
  function modalClickHandler(event) {
    instance.close();
  }

  function escKeyPressHandler(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
