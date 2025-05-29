const buttonTemplate = document.querySelector('#button-template').content;

export const createButton = (text) => {
  const buttonElement = buttonTemplate.querySelector('.button').cloneNode(true);
  buttonElement.querySelector('.button__title').textContent = text;

  return buttonElement;
};