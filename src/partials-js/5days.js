import { addMonths } from 'date-fns';
import { cityData } from '../index';

export function Day5Hiden() {
  const $5DaysSection = document.querySelector('.Days5');
  const $5DaysCityNAme = document.querySelector('.Day5CityName');
  const $Today = document.querySelector('.weather-container');
  const $Timer = document.querySelector('.date-container-bg');
  const $button = document.querySelector('.btn-container');

  $5DaysSection.classList.add('Days5_hiden');
  $5DaysCityNAme.classList.add('Days5_hiden');
  $Today.classList.remove('Days5_hiden');
  $Timer.classList.remove('Days5_hiden');
  $button.classList.remove('btn-container--margin');

  while ($5DaysSection.firstChild) {
    $5DaysSection.removeChild($5DaysSection.firstChild);
  }
  while ($5DaysCityNAme.firstChild) {
    $5DaysCityNAme.removeChild($5DaysCityNAme.firstChild);
  }
}

let $moreInfoContainer = null;

export function GenerateView5Days() {
  const $5DaysSection = document.querySelector('.Days5');
  const $5DaysCityNAme = document.querySelector('.Day5CityName');
  const $Today = document.querySelector('.weather-container');
  const $Timer = document.querySelector('.date-container-bg');
  const $button = document.querySelector('.btn-container');

  const $vievIsDone = document.querySelector('.Days5_viev');

  if ($5DaysSection.classList.contains('Days5_hiden')) {
    $5DaysSection.classList.remove('Days5_hiden');
    $5DaysCityNAme.classList.remove('Days5_hiden');
    $Today.classList.add('Days5_hiden');
    $Timer.classList.add('Days5_hiden');
    $button.classList.add('btn-container--margin');
  }

  if (!$vievIsDone) {
    const $days5Container = document.createElement('div');
    $days5Container.classList.add('Days5-container');
    $5DaysSection.append($days5Container);
    const cityNAme = document.createElement('div');
    const nameCity = `<p>${cityData.city.name}, ${cityData.city.country}</p>`;
    cityNAme.innerHTML = nameCity;
    $5DaysCityNAme.append(cityNAme);

    for (let index = 0; index < 33; index += 8) {
      const Days5 = document.createElement('div');
      Days5.classList.add('Days5_viev');
      let data = new Date(cityData.list[index].dt_txt);
      let dataWeek = data.toLocaleDateString('en-us', {
        weekday: 'long',
      });
      let dataDay = data.toLocaleDateString('en-us', {
        month: 'short',
        day: 'numeric',
      });
      const days5Array = `
      <div class="Days5_viev__week">
      <p>${dataWeek}</p>
      </div>
      <div class="Days5_viev__day">
      <p>${dataDay}</p>
      </div>
      <div class="Days5_viev__icon Days5_viev__icon${cityData.list[index].weather[0].icon}">
      </div>
      <div class="Days5_viev__temp">
      <p>min</p>
      <p>max</p>
      </div>
      <div class="Days5_viev__tempValue">
      <p>${Math.round(cityData.list[index].main.temp_min)} &deg</p>
      <p>${Math.round(cityData.list[index].main.temp_max)} &deg</p>
      </div>
      <div class="Days5_viev__moreInfo">
      <a href="${cityData.city.name}">more info</a>
      </div>`;
      Days5.innerHTML = days5Array;
      $days5Container.append(Days5);
    }
    $moreInfoContainer = document.createElement('div');
    $moreInfoContainer.classList.add('more-info');
    $5DaysSection.append($moreInfoContainer);
  }
  const $moreInfoButtons = document.querySelectorAll('.Days5_viev__moreInfo a');
  for (let i = 0; i < $moreInfoButtons.length; i++) {
    $moreInfoButtons[i].addEventListener('click', ev => {
      ev.preventDefault();
      // showMoreInfo(i);
      console.log(cityData);
      while ($moreInfoContainer.firstElementChild) {
        $moreInfoContainer.removeChild($moreInfoContainer.firstElementChild);
      }
      for (let j = i * 7; j < i * 7 + 7; j++) {
        console.log(cityData.list[j].dt);
        let time = new Date(cityData.list[j].dt_txt);
        const $moreInfoItemBox = document.createElement('div');
        $moreInfoItemBox.classList.add('more-info__item');
        $moreInfoContainer.append($moreInfoItemBox);
        const $futureTime = document.createElement('p');
        $futureTime.classList.add('more-info__time');
        console.log(time.getHours());
        if (time.getHours() < 10) {
          $futureTime.textContent = `0${time.getHours()}:00`;
        } else {
          $futureTime.textContent = `${time.getHours()}:00`;
        }
        $moreInfoItemBox.append($futureTime);
        const $futureWeatherIcon = document.createElement('div');
        $futureWeatherIcon.classList.add(
          `Days5_viev__icon${cityData.list[i].weather[0].icon}`,
          'Days5_viev__icon',
        );
        $moreInfoItemBox.append($futureWeatherIcon);
        const $futureTemp = document.createElement('p');
        $futureTemp.classList.add('more-info__temp');
        $futureTemp.textContent = `${Math.round(cityData.list[i].main.temp)}\xB0`;
        $moreInfoItemBox.append($futureTemp);

        $moreInfoItemBox.insertAdjacentHTML(
          'beforeend',
          `<div class="more-info__detail">
          <div class="more-info__detail-pressure"></div>
          <div class="more-info__detail-value">${cityData.list[i].main.pressure} mm</div>
        </div>
        <div class="more-info__detail">
          <div class="more-info__detail-humidity"></div>
          <div class="more-info__detail-value">${cityData.list[i].main.humidity}%</div>
        </div>
        <div class="more-info__detail">
          <div class="more-info__detail-wind"></div>
          <div class="more-info__detail-value">${cityData.list[i].wind.speed} m/s</div>
        </div>`,
        );
      }
    });
  }
}

function showMoreInfo(dayNumber) {}
