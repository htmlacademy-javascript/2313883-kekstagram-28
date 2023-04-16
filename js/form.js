import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_LENGTH = 20;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загружаем...'
};

const imgForm = document.querySelector('.img-upload__form');
const loadForm = imgForm.querySelector('.img-upload__overlay');
const openButton = imgForm.querySelector('#upload-file');
const closeButton = imgForm.querySelector('#upload-cancel');
const hashtagsInput = imgForm.querySelector('.text__hashtags');
const commentInput = imgForm.querySelector('.text__description');
const submitButton = imgForm.querySelector('.img-upload__submit');

const isValidTag = (tag) => HASHTAG.test(tag);
const isValidCount = (tags) => tags.length <= MAX_HASHTAG_LENGTH;

const isTextFieldFocuced = () =>
  document.activeElement === hashtagsInput ||
  document.activeElement === commentInput;

const uniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return isValidCount(tags) && uniqueTags(tags) && tags.every(isValidTag);
};

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (cb) => {
  imgForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(imgForm));
      unblockSubmitButton();
    }
  });
};

const showModal = () => {
  loadForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  imgForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  loadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocuced()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagsInput,
  validateTags,
  TAG_ERROR_TEXT
);

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

openButton.addEventListener('change', showModal);
closeButton.addEventListener('click', hideModal);
imgForm.addEventListener('submit', onFormSubmit);

export { hideModal, setFormSubmit };

