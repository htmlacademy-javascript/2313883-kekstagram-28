const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const HASHTAG_MAX_COUNT = 50;
const VALID_SYMBOL = /^#[a-za-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const cancelButton = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const coomentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === coomentField;

function onModalKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileFieldChange = () => {
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

const isValidTag = (tag) => VALID_SYMBOL.test(tag);

const hasValidCount = (tags) => tags.length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileFieldChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
