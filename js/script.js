"use strict";
window.onload = function () {
  let content;
  let list = document.querySelector('[data-list="list"]');
  async function getResponse() {
    let response = await fetch("https://api.hh.ru/vacancies");
    content = await response.json();

    let contentOldItems = content.items;

    function dataVacancies(el) {
      // content = contentOldItems.splice(0, 5);
      content = el;
      console.log(content);
      for (let key in content) {
        function trueFuncImg(urlImg) {
          if (urlImg) {
            return urlImg.original;
          } else {
            return "./img/1.png";
          }
        }
        trueFuncImg();
        list.innerHTML += `<div class="vacancie__item">
        <div class="vacancie__body" >
          <div class="vacancie-left" >
            <div class="vacancie-left__img-block" >
              <div class="vacancie-left__img-pos" >
                <img class="vacancie-left__img" src="${trueFuncImg(
                  content[key].employer.logo_urls
                )}" width="373" height="95">
              </div>
            </div>
            <div class="vacancie-left__data-block vacancie-left__data-block_margin-top">
              <ul class="vacancie-left__data__items ">
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Form:</p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    content[key].schedule.name
                  }</p>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Company: </p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    content[key].employer.name
                  }</p>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Web: </p>
                  <a href="${
                    content[key].employer.alternate_url
                  }" class="filter-item__label vacancie-left__data__second-text" >${
          content[key].id
        }</a>
                </li>
                <li class="vacancie-left__data__item" >
                  <p class="text-color__grey" >Address: </p>
                  <p class="filter-item__label vacancie-left__data__second-text" >${
                    content[key].area.name
                  }</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="vacancie-right" >
            <h2 class="vacancie-right__title" >${content[key].name}</h2>
            <div class="vacancie-text vacancie-right__subtitle" >We are looking for an experienced and talented Software Developer to develop, test, document, and implement solutions for SoloProtect clients and devices. The ideal candidate will be self-motivated, have experience working in agile teams, and excellent communication skills</div>
            <div class="vacancie-right__info" >
              <p class="vacancie-text vacancie-right__info__title">Success Snapshot:</p>
              <ul class="vacancie-right__info__items" >
                <li class="vacancie-right__info__item" >
                  <p class="vacancie-text vacancie-right__info__text" >${
                    content[key].snippet.responsibility
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

        let moreDetails = document.querySelectorAll(".vacancie-right__show");
        moreDetails.forEach((e) => {
          e.addEventListener("click", () => {
            e.closest(".vacancie-right__info")
              .querySelector(".vacancie-right__info__items")
              .classList.toggle("show-block");
          });
        });
      }
    }
    console.log(typeof content.items);
    // addVacancies(contentOldItems);
    function addVacancies(el) {
      console.log(el);
      let newFiveItems = contentOldItems.splice(el.length, 5);
      console.log(newFiveItems);
      dataVacancies(newFiveItems);
    }
    let showMoreBtn = document.querySelector(".show-more");
    showMoreBtn.addEventListener("click", (e) => {
      addVacancies(content);
    });
    // addVacancies(contentOldItems);
  }
  getResponse();
};
