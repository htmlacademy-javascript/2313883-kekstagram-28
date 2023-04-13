import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { hideModal, setFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { showSuccessMessage, showErrorMessage} from './message.js';

renderGallery(getPictures());

setFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
