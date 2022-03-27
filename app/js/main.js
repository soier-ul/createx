$(function () {

  // contact accordion
  $('.contact-content__accordion-btn').on('click', function () {
    $(this).toggleClass('contact-content__accordion-btn--active');
    $(this).next('.contact-content__accordion-content').slideToggle(350);
  });
  // contact accordion

  // contact tabs
  const contactTabs = document.querySelector('.contacts-page__tabs');
  const contactTabsBtn = document.querySelectorAll('.contacts-page__button');
  const contactTabsContent = document.querySelectorAll('.contacts-page__content');

  if (contactTabs) {
    contactTabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('contacts-page__button')) {
        const contactPath = e.target.dataset.contactPath;
        contactTabsHandler(contactPath);
      }
    });
  }

  const contactTabsHandler = (path) => {
    contactTabsBtn.forEach(el => {
      el.classList.remove('contacts-page__button--active')
    });
    document.querySelector(`[data-contact-path="${path}"]`).classList.add('contacts-page__button--active');

    contactTabsContent.forEach(el => {
      el.classList.remove('contacts-page__content--active')
    });
    document.querySelector(`[data-contact-target="${path}"]`).classList.add('contacts-page__content--active');
  };
  // contact tabs

  // blogs
  $('.blogs-page__btn-on').on('click', function () {
    $('.blogs-page__aside').toggleClass('blogs-page__aside--active');

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.blogs-page__aside, .blogs-page__btn-on, .blogs-page__btn-off')) {
        $('.blogs-page__aside').removeClass('blogs-page__aside--active');
      }
    });
  });

  $('.blogs-page__btn-off').on('click', function () {
    $('.blogs-page__aside').removeClass('blogs-page__aside--active');
  });
  // blogs



  // header hide
  let lastScroll = 0;
  const defaultOffset = 800;
  const header = document.querySelector('.header');

  const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
  const containHide = () => header.classList.contains('header--hide');

  window.addEventListener('scroll', () => {
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      header.classList.add('header--hide');
    } else if (scrollPosition() < lastScroll && containHide()) {
      header.classList.remove('header--hide');
    }

    lastScroll = scrollPosition();
  })
  // header hide

  //
  $('input[type=file]').each(function () {
    var $input = $(this),
      $label = $input.next('.product-page__file-btn'),
      labelVal = $label.html();

    $input.hide();
    $input.on('change', function (element) {
      var fileName = '';
      if (element.target.value) fileName = element.target.value.split('\\').pop();
      fileName ? $label.addClass('has-file').find('.product-page__file-text').html(fileName) : $label.removeClass('has-file').html(labelVal);
    });
  });
  //

  //prduct page tabs
  const tabs = document.querySelector('.product-tabs');
  const tabsBtn = document.querySelectorAll('.product-tabs__btn');
  const tabsContent = document.querySelectorAll('.product-tabs__content');

  if (tabs) {
    tabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('product-tabs__btn')) {
        const tabsPath = e.target.dataset.tabsPath;
        tabsHandler(tabsPath);
      }
    });
  }

  const tabsHandler = (path) => {
    tabsBtn.forEach(el => {
      el.classList.remove('product-tabs__btn--active')
    });
    document.querySelector(`[data-tabs-path="${path}"]`).classList.add('product-tabs__btn--active');

    tabsContent.forEach(el => {
      el.classList.remove('product-tabs__content--active')
    });
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('product-tabs__content--active');
  };
  //prduct page tabs

  // product info accordion
  $('.product-content__details-btn').on('click', function () {
    $(this).toggleClass('product-content__details-btn--active');
    $(this).next('.product-content__details-content').slideToggle(350);
  });
  // product info accordion

  // product Slider main
  const galleryThumbs = new Swiper('.product-content__thumbs', {
    slidesPerView: 5,
    spaceBetween: 17,
    watchSlidesProgress: true,

    breakpoints: {
      320: {
        spaceBetween: 10,
        freeMode: true,
      },

      1201: {
        slidesPerView: 5,
        spaceBetween: 17,
      },
    }
  });

  const galleryMain = new Swiper('.product-content__slider', {

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    thumbs: {
      swiper: galleryThumbs,
    },

    breakpoints: {
      320: {
        scrollbar: {
          el: '.swiper-scrollbar',
        }
      }
    }
  });
  // product Slider main

  // filters accordion
  $('.filters__btn').on('click', function () {
    $(this).toggleClass('filters__btn--active');
    $(this).next('.filters-content').slideToggle(350);
  });
  // filters accordion

  //filters hide
  $('.filters-btn span').on('click', function () {
    $('.catalog-products__content').toggleClass('catalog-products__content--hide');
    $('.filters').toggleClass('filters--hide');
    $('.filters-btn__text').toggleClass('filters-btn__text--hide');

    if ((this).classList.contains('filters-btn__text--hide')) {
      (this).textContent = 'Показать фильтры';
    } else {
      (this).textContent = 'Скрыть фильтры';
    }
  });

  $('.filters-btn_mobile, .filters__burger').on('click', function () {
    $('.filters').toggleClass('filters--hide');

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.filters-btn_mobile, .filters__burger, .filters')) {
        $('.filters').removeClass('filters--hide');
      }
    });
  });
  //filters hide

  //range slider
  const rangeSlider = document.getElementById('range-slider');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [1200, 18700],
      connect: true,
      step: 1,
      tooltips: true,
      range: {
        'min': [0],
        'max': [25000]
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        }
      }
    });

    const rangeInput0 = document.getElementById('input-0');
    const rangeInput1 = document.getElementById('input-1');
    const rangeInputs = [rangeInput0, rangeInput1];

    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeInputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;

      rangeSlider.noUiSlider.set(arr);
    };

    rangeInputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }
  //range slider

  // scroll filter
  document.querySelectorAll('.filters-text__form-checkbox, .filters-color__form-checkbox').forEach(el => {
    new SimpleBar(el);
  });
  // scroll filter

  // burger
  $('.burger').on('click', function () {
    $('.header__main-inner').toggleClass('header__main-inner--active');

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.burger, .header__main-inner')) {
        $('.header__main-inner').removeClass('header__main-inner--active');
      }
    });
  });
  // burger

  // entrance user
  const authenticationLinks = document.querySelectorAll('.authentication__btn');
  const entranceOverlay = document.querySelector('.entrance__overlay');
  const entrance = document.querySelectorAll('.entrance__modal');

  authenticationLinks.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      entrance.forEach((el) => {
        el.classList.remove('entrance__modal--active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('entrance__modal--active');
      entranceOverlay.classList.add('entrance__overlay--active');
    });
  });

  entranceOverlay.addEventListener('click', (e) => {
    if (e.target == entranceOverlay) {
      entranceOverlay.classList.remove('entrance__overlay--active');
      entrance.forEach((el) => {
        el.classList.remove('entrance__modal--active');
      });
    }
  });

  $('.entrance__btn').on('click', function () {
    $('.entrance__overlay').removeClass('entrance__overlay--active');
    $('.entrance__modal').removeClass('entrance__modal--active');
  })
  // entrance user

  // password hide
  const passwordBtn = document.querySelector('.entrance__input-btn');
  const passwordInput = document.querySelector('.entrance__input--password');

  passwordBtn.addEventListener('click', () => {

    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
    } else {
      passwordInput.setAttribute('type', 'password');
    }
  });
  // password hide


  // swipe to up
  $('.footer__link').on("click", function (event) {
    event.preventDefault();

    var id = $(this).attr('href'),

      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top
    }, 850);
  });
  // swipe to up 

  // stepper
  const stepper = document.querySelector('.stepper');
  const stepperInput = stepper.querySelector('.stepper__input');
  const stepperBtnUp = stepper.querySelector('.stepper__btn--up');
  const stepperBtnDown = stepper.querySelector('.stepper__btn--down');

  let count = stepperInput.value;

  const isNotApple = () => {
    if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return false;
    }
    return true;
  };

  function allowNumbersOnly(e) {
    var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
      e.preventDefault();
    }
  }

  stepperInput.addEventListener('keyup', (e) => {
    let self = e.currentTarget;

    if (self.value == '0') {
      self.value = 1;
    }

    if (isNotApple) {
      self.style.width = `${self.value.length + 1}ex`;
    } else {
      self.style.width = `${self.value.length + 2}ex`;
    }

    count = stepperInput.value;

    if (count == 1) {
      stepperBtnDown.classList.add('stepper__btn--disabled');
    } else {
      stepperBtnDown.classList.remove('stepper__btn--disabled');
    }
  });

  stepperInput.addEventListener('keypress', (e) => {
    allowNumbersOnly(e);
  });

  stepperInput.addEventListener('change', (e) => {
    let self = e.currentTarget;

    if (!self.value) {
      self.value = 1;
    }

    count = stepperInput.value;

    if (count == 1) {
      stepperBtnDown.classList.add('stepper__btn--disabled');
    } else {
      stepperBtnDown.classList.remove('stepper__btn--disabled');
    }
  });

  stepperBtnUp.addEventListener('click', (e) => {
    e.preventDefault();

    count++;

    if (count == 1) {
      stepperBtnDown.classList.add('stepper__btn--disabled');
    } else {
      stepperBtnDown.classList.remove('stepper__btn--disabled');
    }

    stepperInput.value = count;

    if (isNotApple) {
      stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
    } else {
      stepperInput.style.width = `${stepperInput.value.length + 2}ex`;
    }
  });

  stepperBtnDown.addEventListener('click', (e) => {
    e.preventDefault();

    count--;

    if (count == 1) {
      stepperBtnDown.classList.add('stepper__btn--disabled');
    } else {
      stepperBtnDown.classList.remove('stepper__btn--disabled');
    }

    stepperInput.value = count;

    if (isNotApple) {
      stepperInput.style.width = `${stepperInput.value.length + 1}ex`;
    } else {
      stepperInput.style.width = `${stepperInput.value.length + 2}ex`;
    }
  });
  // stepper

  //
  $('.header__buttons-btn--cart').on('click', function () {
    $('.cart').toggleClass('cart--active');

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.cart, .header__buttons-btn--cart')) {
        $('.cart').removeClass('cart--active');
      }
    });
  });
  //

  //
  $('.cart__top-btn').on('click', function () {
    $('.cart').removeClass('cart--active');
  });
  //

  // product-card slider
  const swiperProductCard = new Swiper('.product-card__slider', {
    speed: 850,
    lazy: true,

    navigation: {
      nextEl: '.product-card__arrows-next',
      prevEl: '.product-card__arrows-prev',
    },
  });
  // product-card slider

  // product-offers sliders
  const offerSlider = document.querySelectorAll('.product-offers__slider');

  offerSlider.forEach((el) => {
    let swiperProductOffers = new Swiper(el, {
      speed: 1300,
      allowTouchMove: false,

      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },

      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 15,
          allowTouchMove: true,
        },
        1201: {
          slidesPerView: 3,
          spaceBetween: 15,
        }
      }
    })
  });
  // product-offers sliders

  // product-offers sliders--mini
  const offerSliderMini = document.querySelectorAll('.product-offers__slider--mini');

  offerSliderMini.forEach((el) => {
    let swiperProductOffers = new Swiper(el, {
      slidesPerView: 4,
      speed: 1300,
      allowTouchMove: false,

      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },

      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          allowTouchMove: true,
        },

        1199: {
          slidesPerView: 4,
          spaceBetween: 25,
        }
      }
    })
  });
  // product-offers sliders--mini

  //product offers slider
  const productOffersSlider = document.querySelectorAll('.product-style__slider');

  productOffersSlider.forEach((el) => {
    let productStyleSlider = new Swiper(el, {
      slidesPerView: 2,
      spaceBetween: 30,
      speed: 1300,
      allowTouchMove: false,

      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 15,
          allowTouchMove: true,
        },

        1199: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
      }
    })
  });
  //product offers slider

  //
  $('.rating').rateYo({
    rating: 5,
    starWidth: "13px",
    ratedFill: "#f89828",
    normalFill: "#b3b7bc",
    spacing: "3px",
    halfStar: true,
    starSvg: '<svg><use xlink: href="../images/sprite.svg#icon-star"></use></svg>'
  });
  //

  //arrivals slider
  const swiperArrivals = new Swiper('.arrivals__slider', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    speed: 1300,
    allowTouchMove: false,

    breakpoints: {
      992: {
        spaceBetween: 15
      }
    },

    pagination: {
      el: ".arrivals__pagination",
      clickable: true,
    }
  });
  // arrivals slider

  //hero slider
  const swiperHero = new Swiper('.hero__slider', {
    speed: 1100,
    autoplay: {
      delay: 4000,
    },

    pagination: {
      el: ".hero__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  // hero slider  

  //select
  const defaultSelect = () => {
    const element = document.querySelector('.catalog-products__select, .product-reviews__select');
    const choices = new Choices(element, {
      searchEnabled: false,
      noResultsText: 'Ничего не найдено'
    });
  };

  defaultSelect();

  const modalSelect = () => {
    const element = document.querySelector('.product-page__modal-select');
    const choices = new Choices(element, {
      searchEnabled: false,
      noResultsText: 'Ничего не найдено'
    });
  };

  modalSelect();
  //select

  // review modal
  const reviewBtn = document.querySelectorAll('.product-reviews__interaction-btn');
  const reviewOverlay = document.querySelector('.product-page__overlay');
  const reviewModals = document.querySelectorAll('.product-page__modal');
  const reviewOff = document.querySelector('.product-page__modal-off');

  reviewBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-review-path');

      reviewModals.forEach((el) => {
        el.classList.remove('product-page__modal--visible');
      });

      document.querySelector(`[data-review-target="${path}"]`).classList.add('product-page__modal--visible');
      reviewOverlay.classList.add('product-page__overlay--visible');
    });
  });

  reviewOverlay.addEventListener('click', (e) => {

    if (e.target == reviewOverlay) {
      reviewOverlay.classList.remove('product-page__overlay--visible');
      reviewModals.forEach((el) => {
        el.classList.remove('product-page__modal--visible');
      });
    }
  });

  reviewOff.addEventListener('click', (e) => {

    reviewOverlay.classList.remove('product-page__overlay--visible');
    reviewModals.forEach((el) => {
      el.classList.remove('product-page__modal--visible');
    });
  });
  // review modal
});

document.addEventListener('DOMContentLoaded', () => {
  const productsBtn = document.querySelectorAll('.product-card__buy-btn');
  const cartProductsList = document.querySelector('.cart__content-list');
  const cart = document.querySelector('.cart');
  const cartQuantity = document.querySelector('.header__buttons-num--cart');
  const fullPrice = document.querySelector('.fullprice');
  let price = 0;

  const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
  };

  const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`;
  };

  const printQuantity = () => {
    let length = cartProductsList.querySelector('.simplebar-content').children.length;
    cartQuantity.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
  };

  const generateCartProduct = (img, title, price, id) => {
    return `
      <li class="cart__content-item">
        <article class="cart__content-product cart-product" data-id="${id}">
          <img class="cart-product__img" src="${img}" alt="Замшевые ботильоны на широком каблуке">
            <div class="cart-product__info">
              <h3 class="cart-product__title">
                ${title}
              </h3>

              <button class="cart-product__del" type="button">
                <svg>
                  <use xlink:href="images/sprite.svg#icon-delete"></use>
                </svg>
              </button>

              <div class="cart-product__text_wrap">
                <span class="cart-product__text">Color: <span>black</span></span>
                <span class="cart-product__text">Size: <span>37</span></span>
              </div>

              <div class="cart-product__buy">
                <div class="cart-product__stepper stepper">
                  <label class="stepper__label">
                    <input class="stepper__input" type="text" value="1" maxlength="3">
                  </label>

                  <div class="stepper__buttons">
                    <button class="stepper__btn stepper__btn--up" type="button">
                      <svg>
                        <use xlink:href="images/sprite.svg#icon-chevron"></use>
                      </svg>
                    </button>
                    <button class="stepper__btn stepper__btn--down stepper__btn--disabled" type="button">
                      <svg>
                        <use xlink:href="images/sprite.svg#icon-chevron"></use>
                      </svg>
                    </button>
                  </div>
                </div>

                <span class="cart-product__price">${normalPrice(price)} ₽</span>
            </div>
          </div>
        </article>
      </li>
    `;
  };

  productsBtn.forEach(el => {
    el.closest('.product-card').setAttribute('data-id', randomId());

    el.addEventListener('click', (e) => {
      let self = e.currentTarget;
      let parent = self.closest('.product-card');
      let id = parent.dataset.id;
      let img = parent.querySelector('.product-card__img').getAttribute('src');
      let title = parent.querySelector('.product-card__descr').textContent;
      let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-card__price-current').textContent));

      plusFullPrice(priceNumber);
      printFullPrice();
      cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
      printQuantity();
      self.disabled = true;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const date = new Date('April 2 2022 00:00:00');

  const daysVal = document.querySelector('.time-count__days .time-count__val');
  const hoursVal = document.querySelector('.time-count__hours .time-count__val');
  const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
  const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

  const daysText = document.querySelector('.time-count__days .time-count__text');
  const hoursText = document.querySelector('.time-count__hours .time-count__text');
  const minutesText = document.querySelector('.time-count__minutes .time-count__text');
  const secondsText = document.querySelector('.time-count__seconds .time-count__text');

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  const timeCount = () => {
    let now = new Date();
    let leftUntil = date - now;

    let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
    let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
    let seconds = Math.floor(leftUntil / 1000) % 60;

    daysVal.textContent = days;
    hoursVal.textContent = hours;
    minutesVal.textContent = minutes;
    secondsVal.textContent = seconds;

    daysText.textContent = declOfNum(days, ['День', 'Дня', 'Дней']);
    hoursText.textContent = declOfNum(hours, ['Час', 'Часа', 'Часов']);
    minutesText.textContent = declOfNum(minutes, ['Минута', 'Минуты', 'Минут']);
    secondsText.textContent = declOfNum(seconds, ['Секунда', 'Секунды', 'Секунд']);
  };

  timeCount();
  setInterval(timeCount, 1000);
});