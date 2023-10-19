import domReady from '@roots/sage/client/dom-ready';

/**
 * Application entrypoint
 */
domReady(async () => {
  // ...
});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
import PhotoSwipeLightbox from 'photoswipe/lightbox';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: () => import('photoswipe')
});
lightbox.init();