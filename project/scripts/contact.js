const form = document.querySelector('#enquiry-form');
const feedback = document.querySelector('#form-feedback');
const serviceField = document.querySelector('#service');
services.forEach(service => {
  const option = document.createElement('option');
  option.value = service.name; option.textContent = service.name; serviceField.append(option);
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.querySelector('#name').value.trim();
  const selectedService = serviceField.value;
  localStorage.setItem('sman-last-interest', selectedService);
  feedback.textContent = `Thank you, ${name}. Your enquiry has been prepared, but it has not been sent. Please contact S-Man Group directly to submit it.`;
  feedback.classList.remove('hidden');
  feedback.focus();
});
const previous = localStorage.getItem('sman-last-interest');
if (previous && [...serviceField.options].some(option => option.value === previous)) serviceField.value = previous;
