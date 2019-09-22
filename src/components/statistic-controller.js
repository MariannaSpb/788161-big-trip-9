import {Stats} from './statistic.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, position} from './utils';
import moment from 'moment';
import {getDurationStat} from '../data';

export class StatisticsController {
  constructor(container) {
    this._container = container;
    this._statistics = new Stats();
    this._events = [];
    this._moneyChart = {};
    this._transportChart = {};
    this._timeChart = {};

    this.create();
  }

  create() {
    render(this._container, this._statistics.getElement(), position.BEFOREEND);
  }

  show(events) {
    this._events = events;
    this._chartMoneyInit();
    this._chartTransportInit();
    this._chartTimeInit();
    this._statistics.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }


  updateData() {
    this._moneyChart.update();
    this._transportChart.update();
    this._timeChart.update();
  }

  _chartMoneyInit() {
    const moneyCtx = this._statistics.getElement().querySelector(`.statistics__chart--money`);

    const events = this._events.reduce((acc, currentValue) => {
      const index = acc.findIndex(({type}) => type === currentValue.type.title);
      if (index !== -1) {
        acc[index].eventPrice += currentValue.eventPrice;
      } else {
        acc.push({
          type: currentValue.type.title,
          price: currentValue.eventPrice,
        });
      }
      return acc;
    }, []);

    const types = events.map(({type}) => type);
    const prices = events.map(({price}) => price);

    this._moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: prices,
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.5)`,
          ],
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${value}€`
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              padding: 0,
            },
            display: false,
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `MONEY`,
          fontSize: 28,
          fontFamily: `'Courier New'`,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }

  _chartTransportInit() {
    const transportCtx = this._statistics.getElement().querySelector(`.statistics__chart--transport`);

    const transportevents = this._events.filter(({type}) => type.placeholder === `to`);
    const events = transportevents.reduce((acc, currentValue) => {
      const index = acc.findIndex(({type}) => type === currentValue.type.title);
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({
          type: currentValue.type.title,
          count: 1,
        });
      }
      return acc;
    }, []);

    const types = events.map(({type}) => type);
    const counts = events.map(({count}) => count);

    this._transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: counts,
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.5)`,
          ],
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${value}x`
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            display: false,
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `TRANSPORT`,
          fontSize: 28,
          fontFamily: `'Courier New'`,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }

  _chartTimeInit() {
    const timeCtx = this._statistics.getElement().querySelector(`.statistics__chart--time`);

    const events = this._events.map((event) => {

      const startMoment = moment(event.start);
      const endMoment = moment(event.end);
      const duration = moment.duration(moment(endMoment).diff(moment(startMoment)));
      const title = `${event.type.title}  ${event.type.placeholder}  ${event.city.name}`;

      return {
        title,
        duration
      };
    });

    const labels = events.map(({title}) => title);
    const durations = events.map(({duration}) => duration);

    this._timeChart = new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data: durations,
          backgroundColor: [
            `rgba(255, 99, 132, 0.3)`,
            `rgba(54, 162, 235, 0.5)`,
          ],
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${getDurationStat(value)}`
            // formatter: (val) => `${val}H`,

          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            display: false,
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `TIME-SPEND`,
          fontSize: 28,
          fontFamily: `'Courier New'`,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }

}
