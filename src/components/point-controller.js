import {EditEvent} from './form-edit';
import {Event} from './trip-event-card';
import {render, position, Mode, unrender} from './utils';
import {cities, types} from '../data';
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';


export class PointController {
  constructor(container, data, mode, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._event = new Event(this._data);
    this._editForm = new EditEvent(this._data);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this.init(mode);
  }

  init(mode) {

    let currentView = this._event;
    const addEventBtn = document.querySelector(`.trip-main__event-add-btn`);

    if (mode === Mode.ADDING) {
      this._editForm.getElement().classList.add(`trip-events__item`);
      this._editForm.getElement().querySelector(`.event__favorite-btn`).remove();
      currentView = this._editForm;
    }

    flatpickr(this._editForm.getElement().querySelector(`input[name= event-start-time]`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._data.start,
      altFormat: `d/m/y H:i`,
    });

    flatpickr(this._editForm.getElement().querySelector(`input[name= event-end-time]`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._data.end,
      altFormat: `d/m/y H:i`,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (mode === Mode.DEFAULT) {
          if (this._container.contains(this._editForm.getElement())) {
            this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
          }
        } else if (mode === Mode.ADDING) {
          unrender(currentView.getElement());
          currentView.removeElement();
          this._container.getElement().removeChild(currentView.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    this._event.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._editForm.getElement(), this._event.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._editForm.getElement()
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        if (mode === Mode.DEFAULT) {
          this._onDataChange(null, this._data);

        } else if (mode === Mode.ADDING) {
          unrender(currentView.getElement());
          currentView.removeElement();
          addEventBtn.removeAttribute(`disabled`);
        }
      });


    this._editForm.getElement()
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        // this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
        this._container.replaceChild(currentView.getElement(), this._editForm.getElement());
        unrender(currentView.getElement());

        const formData = new FormData(this._editForm .getElement());

        const entry = {
          eventPrice: formData.get(`event-price`),
          start: moment(formData.get(`event-start-time`)).format(),
          end: moment(formData.get(`event-end-time`)).format(),
          type: types[types.findIndex((it) => it.id === formData.get(`event-type`))],
          city: cities[cities.findIndex((city) => city.name === formData.get(`event-destination`))],
          productId: ``,
        };

        entry.type.offers.forEach((offer) => {
          if (formData.get(`event-offer-${offer.id}`)) {
            offer.isApplied = true;
          } else {
            offer.isApplied = false;
          }
        });

        this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

        addEventBtn.removeAttribute(`disabled`);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });


    render(this._container, currentView.getElement(), position.AFTERBEGIN);

  }

  setDefaultView() {
    if (this._container.contains(this._editForm.getElement())) {
      this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
    }
  }
}
