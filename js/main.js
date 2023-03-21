import { getPictures } from './functions-picture.js';

import { renderThumbnails } from './thumbnail.js';

import { renderFullSizePicture } from './full-size-picture.js';

renderThumbnails(getPictures());
renderFullSizePicture();
