import {EditEvent} from './form-edit';
import {Event} from './trip-event-card';
import {render, position} from './utils';
import {cities, types} from '../data';


export class PointController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._event = new Event(data);
    this._editForm = new EditEvent(data);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
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
      .querySelector(`form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(this._editForm .getElement().querySelector(`.event--edit`));

        const entry = {
          eventPrice: formData.get(`event-price`),
          start: new Date(formData.get(`event-start-time`)),
          end: new Date(formData.get(`event-end-time`)),
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

        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    render(this._container, this._event.getElement(), position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._editForm.getElement())) {
      this._container.replaceChild(this._event.getElement(), this._editForm.getElement());
    }
  }
}
