import "./login.scss";
import {
  MDCRipple
} from '@material/ripple';
import {
  MDCTextField
} from '@material/textfield';

const buttonElements = [].slice.call(document.querySelectorAll('.mdc-button'));
buttonElements.forEach((buttonEl) => {
  new MDCRipple(buttonEl);
});

const textFieldElements = [].slice.call(document.querySelectorAll('.mdc-text-field'));
textFieldElements.forEach((textFieldEl) => {
  new MDCTextField(textFieldEl);
});