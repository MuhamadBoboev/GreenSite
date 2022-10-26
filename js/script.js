"use strict";
// ждем пока сайт полностью загрузиться
window.onload = function () {
  async function getResponse() {
    let response = await fetch("https://api.hh.ru/vacancies");
    let content = await response.json();

    let contentItems = content.items;
    const footerBtnTest = document.querySelector(".footer-btn__test");
    let list = document.querySelector('[data-list="list"]');
    const showMoreBtn = document.querySelector(".show-more");
    const clearFilterSearchBtn = document.querySelector(
      ".filter-item__last__text"
    );
    const myMail = document.querySelector("#form-email");
    const myPhone = document.querySelector("#form-phone");

    // (функция) при фокусе на input phona задаем value +7
    function funcMyPhoneHover() {
      myPhone.addEventListener("focus", (e) => {
        myPhone.setAttribute("value", "+7");
      });
      myPhone.addEventListener("blur", (e) => {
        myPhone.removeAttribute("value", "+7");
      });
    }
    funcMyPhoneHover();

    // (функция) проверяем на валидность поля footer (email и phone)
    function funcFormValid() {
      footerBtnTest.addEventListener("click", (e) => {
        funcValidMail();
        function funcValidMail() {
          let errowText = document.querySelector(".input-item__error_1");
          let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
          let valid = re.test(myMail.value);
          let output;
          if (valid) {
            output = "Адрес эл. почты введен правильно!";
            errowText.style.color = "green";
          } else {
            output = "Адрес электронной почты введен неправильно!";
            errowText.style.color = "red";
          }
          errowText.innerHTML = output;
        }
        funcValidPhone();
        function funcValidPhone() {
          let errowText = document.querySelector(".input-item__error_2");
          let re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
          let valid = re.test(myPhone.value);
          let output;
          if (valid) {
            output = "Номер введен правильно!";
            errowText.style.color = "green";
          } else {
            output = "Номер почты введен неправильно!";
            errowText.style.color = "red";
          }
          errowText.innerHTML = output;
        }
      });
    }
    funcFormValid();

    // (функция) поиска
    function funcSearch() {
      let searcBar = document.querySelector("[data-search='search']");
      searcBar.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredPosition = contentItems.filter((element) => {
          return element.name.toLowerCase().includes(searchString);
        });
        if (searchString.length > 0) {
          clearFilterSearchBtn.classList.add("active");
        } else {
          clearFilterSearchBtn.classList.remove("active");
        }
        clearFilterSearchBtn.addEventListener("click", (e) => {
          searcBar.value = null;
          addClickVacancies(contentItems);
          clearFilterSearchBtn.classList.remove("active");
        });

        addVacancies(filteredPosition);
      });
    }
    funcSearch();

    // (функция) при клике раскрываем  остальные детали
    function funcMoreDetails() {
      let moreDetails = document.querySelectorAll(".vacancie-right__show");
      moreDetails.forEach((e) => {
        e.addEventListener("click", () => {
          e.closest(".vacancie-right__info")
            .querySelector(".vacancie-right__info__items")
            .classList.toggle("show-block");
        });
      });
    }
    funcMoreDetails();

    // (функция) здесь добавляем новые вакансии
    function addVacancies(element) {
      let vacancieElementHTML = element.map((e) => {
        return `
        <div class="vacancie__item">
        <div class="vacancie__body" >
          <div class="vacancie-left" >
            <div class="vacancie-left__img-block" >
              <div class="vacancie-left__img-pos" >
                <img class="vacancie-left__img" alt="логотип компании ${
                  e.employer.name
                }" src="${funcSearchUrlLogo(
          e.employer.logo_urls
        )}" width="373" height="95">
              </div>
            </div>
            <div class="vacancie-left__data-block vacancie-left__data-block_margin-top">
              <ul class="vacancie-left__data__items ">
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Form:</p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    e.schedule.name
                  }</p>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Company: </p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    e.employer.name
                  } </p>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Web: </p>
                  <a href="${
                    e.employer.alternate_url
                  }" class="filter-item__label vacancie-left__data__second-text" >${
          e.id
        }</a>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Address: </p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    e.area.name
                  }</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="vacancie-right" >
            <h2 class="vacancie-right__title" >${e.name}</h2>
            <div class="vacancie-text vacancie-right__subtitle" >We are looking for an experienced and talented Software Developer to develop, test, document, and implement solutions for SoloProtect clients and devices. The ideal candidate will be self-motivated, have experience working in agile teams, and excellent communication skills</div>
            <div class="vacancie-right__info" >
              <p class="vacancie-text vacancie-right__info__title">Success Snapshot:</p>
              <ul class="vacancie-right__info__items" >
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >${
                    e.snippet.responsibility
                  }</p>
                </li>
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >Develop solutions for SoloProtect product offerings using .NET languages and your experience of GIS solutions</p>
                </li>
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >Develop solutions for SoloProtect product offerings using .NET languages and your experience of GIS solutions</p>
                </li>
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >Develop solutions for SoloProtect product offerings using .NET languages and your experience of GIS solutions</p>
                </li>
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >Develop solutions for SoloProtect product offerings using .NET languages and your experience of GIS solutions</p>
                </li>
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >Develop solutions for SoloProtect product offerings using .NET languages and your experience of GIS solutions</p>
                </li>
              </ul>
              <div class="vacancie-right__bottom" >
                <a class="vacancie-text vacancie-right__show" >more details</a>
              </div>

            </div>
          </div>
        </div>
        </div>`;
      });
      list.innerHTML = vacancieElementHTML;
      function funcSearchUrlLogo(urlImg) {
        if (urlImg) {
          return urlImg.original;
        } else {
          return "./img/1.png";
        }
      }
      funcSearchUrlLogo();
      funcMoreDetails();
    }

    // (функция) при клике, добавляем 5 новых вакансии
    let lengthOldItems = 5;
    let newFiveItems;
    function addClickVacancies(element) {
      let dataItems = Array.from(element);
      newFiveItems = dataItems.splice(0, lengthOldItems);

      addVacancies(newFiveItems);
      lengthOldItems += 5;
      if (dataItems.length == 0) {
        showMoreBtn.style.display = "none";
      }
    }
    addClickVacancies(contentItems);

    // кнопка, при нажатии которой, добавляем 5 новых вакансии
    showMoreBtn.addEventListener("click", (e) => {
      addClickVacancies(contentItems);
    });
  }
  getResponse();
};
