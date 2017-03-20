import svg4everybody from 'svg4everybody';
import airports from './data/airports';

$(() => {
  svg4everybody();

  $(".search-form__origin").select2({
    data: airports
  });

  $(".search-form__destination").select2({
    data: airports
  });

  $(".search-form__date").flatpickr();

  $(".search-form__adult").select2();
  $(".search-form__children").select2();
  $(".search-form__type").select2();

  $(".search-form__button").bind('click', () => $(".list").show())

});
