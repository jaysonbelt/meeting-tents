import '../main.css';
import { initScrollReveal } from './scroll-observer.js';
import { initNav } from './nav.js';
import { initGiving } from './giving.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNav();
  initGiving();
});
