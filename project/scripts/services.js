const serviceGrid = document.querySelector('#service-grid');
const categorySelect = document.querySelector('#category-filter');
const savedList = document.querySelector('#saved-list');
const resultCount = document.querySelector('#result-count');
const storageKey = 'sman-saved-services';
function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(value) ? value.filter(id => typeof id === 'string') : [];
  } catch { return []; }
}
let savedIds = readSaved();
function persistSaved() { localStorage.setItem(storageKey, JSON.stringify(savedIds)); }
function renderSaved() {
  savedList.replaceChildren();
  const matches = services.filter(service => savedIds.includes(service.id));
  if (!matches.length) {
    const li = document.createElement('li'); li.textContent = 'No services saved yet.'; savedList.append(li); return;
  }
  matches.forEach(service => {
    const li = document.createElement('li');
    const name = document.createElement('span'); name.textContent = service.name;
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${service.name} from saved services`);
    remove.addEventListener('click', () => { savedIds = savedIds.filter(id => id !== service.id); persistSaved(); renderSaved(); renderServices(); });
    li.append(name, remove); savedList.append(li);
  });
}
function renderServices() {
  const category = categorySelect.value;
  const shown = services.filter(service => category === 'All' || service.category === category);
  serviceGrid.replaceChildren();
  shown.forEach(service => {
    const article = document.createElement('article'); article.className = 'card';
    const label = document.createElement('span'); label.className = 'pill'; label.textContent = service.category;
    const heading = document.createElement('h3'); heading.textContent = service.name;
    const description = document.createElement('p'); description.textContent = service.description;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'btn outline';
    const isSaved = savedIds.includes(service.id);
    button.textContent = isSaved ? 'Saved ✓' : 'Save service';
    button.setAttribute('aria-label', `${isSaved ? 'Remove' : 'Save'} ${service.name}`);
    button.addEventListener('click', () => {
      savedIds = savedIds.includes(service.id) ? savedIds.filter(id => id !== service.id) : [...savedIds, service.id];
      persistSaved(); renderSaved(); renderServices();
    });
    article.append(label, heading, description, button); serviceGrid.append(article);
  });
  resultCount.textContent = `${shown.length} services shown`;
}
categorySelect.addEventListener('change', renderServices);
renderServices(); renderSaved();
