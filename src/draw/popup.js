import Origo from 'Origo';

function render(target, coordsId) {
  const pop = `<div id="o-popup-${coordsId}">
      <div class="o-popup o-card">
        <div class="flex row justify-end">
          <div id="o-card-title-${coordsId}" class="justify-start margin-y-smaller margin-left text-weight-bold" style="width:100%;"></div>
          <button id="o-close-button-${coordsId}" class="small round margin-top-smaller margin-bottom-auto margin-right-small icon-smallest grey-lightest no-shrink" aria-label="Stäng">
            <span class="icon ">
              <svg>
                <use xlink:href="#ic_close_24px"></use>
              </svg>
            </span>
          </button>
        </div>
        <div class="o-card-content"></div>
      </div>
    </div>`;
  document.getElementById(target.substring(1)).appendChild(Origo.ui.dom.html(pop));
}

function getEl(coordsId) {
  return document.getElementById(`o-popup-${coordsId}`);
}

function setVisibility(visible, coordsId) {
  const popel = document.getElementById(`o-popup-${coordsId}`);
  const { style } = popel;
  if (visible) {
    style.display = 'block';
  } else {
    style.display = 'none';
  }
}

function setTitle(title, coordsId) {
  const popel = document.getElementById(`o-card-title-${coordsId}`);
  popel.innerHTML = title;
}

function insertContent(content, coordsId) {
  const popel = document.getElementById(`o-popup-${coordsId}`).getElementsByClassName('o-card-content')[0];
  popel.innerHTML = content;
}

function setContent(config) {
  const { title, content, coordsId } = config;
  if (title) {
    setTitle(title, coordsId);
  } else {
    setTitle('', coordsId);
  }
  if (content) {
    insertContent(content, coordsId);
  } else {
    insertContent('', coordsId);
  }
}

function bindUIActions(coordsId) {
  const closeel = document.querySelector(`#o-popup-${coordsId} .o-popup #o-close-button-${coordsId}`);
  closeel.addEventListener('click', (evt) => {
    setVisibility(false, coordsId);
    evt.preventDefault();
  });
}

export default function popup(target, coordsId) {
  render(target, coordsId);
  bindUIActions(coordsId);
  return {
    getEl,
    setVisibility,
    setTitle,
    setContent
  };
}
