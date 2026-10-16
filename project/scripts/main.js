const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
  });
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const modified = document.querySelector('#modified');
if (modified) modified.textContent = document.lastModified;
