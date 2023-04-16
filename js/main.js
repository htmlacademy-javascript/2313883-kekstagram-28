import { renderGallery } from './gallery.js';
import { hideModal, setFormSubmit } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { showSuccess, showError} from './message.js';

setFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccess();
  } catch {
    showError();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}
