const tbody = document.body.getElementsByClassName("tbody");
const pagesContainer = document.body.getElementsByClassName("pagesContainer");
const firstName = document.body.getElementsByClassName("firstName");
const lastName = document.body.getElementsByClassName("lastName");
const about = document.body.getElementsByClassName("about");
const eyeColor = document.body.getElementsByClassName("eyeColor");
const tableWrapper = document.body.getElementsByClassName("tableWrapper");

let mainData = [...data];
let totalPages = data.length / 10;
let page = 1;
let minCount = 0;
let maxCount = 10;
let dataOfPage = [];

const dataOfPageFilter = () => {
  dataOfPage = mainData.filter((e, i) => i >= minCount && i < maxCount);
};

dataOfPageFilter();

createTable(tbody[0], dataOfPage);
createElementsInside();

//отрисовываем список пользователей
function createTable(tbody, array) {
  tbody.innerHTML = "";

  array.forEach((item) => {
    let tr = document.createElement("tr");
    let tdFirstName = document.createElement("td");
    tdFirstName.className = item.id;
    let tdLastName = document.createElement("td");
    tdLastName.className = "tdLastName";
    let tdAbout = document.createElement("td");
    tdAbout.className = "tdAbout";
    let tdEyeColor = document.createElement("td");
    tdEyeColor.className = "tdEyeColor";
    tdFirstName.innerText = item.name.firstName;
    tdLastName.innerText = item.name.lastName;
    tdAbout.innerText = item.about;
    tdEyeColor.innerText = item.eyeColor;

    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdAbout);
    tr.appendChild(tdEyeColor);
    tbody.appendChild(tr);

    tdFirstName.addEventListener("dblclick", editFieldHandler);
  });
}

//редактирование поля
function editFieldHandler(e) {
  const id = e.target.className;
  let editTable = document.createElement("div");
  editTable.className = "editTable";
  editTable.innerHTML = `<div><input type='text' class='inputEdit'/><button class='btnSave'>Save</button</div>`;
  tableWrapper[0].appendChild(editTable);

  saveEditField(id);
}

function saveEditField(id) {
  let editTable = document.body.getElementsByClassName("editTable");
  const btnSave = document.body.getElementsByClassName("btnSave");
  btnSave[0].onclick = function () {
    const inputEdit = document.body.getElementsByClassName("inputEdit");
    mainData = mainData.map((e) =>
      e.id === id
        ? (e = { ...e, name: { ...e.name, firstName: inputEdit[0].value } })
        : { ...e }
    );
    changePageHandler(page);
    editTable[0].remove();
  };
}

// переключаем страницы
const changePageHandler = (p) => {
  page = p;
  minCount = p === 1 ? 0 : (p - 1) * 10;
  maxCount = p * 10;

  dataOfPageFilter();
  createTable(tbody[0], dataOfPage);
};

// создаем пагинацию и добавляем event
function createElementsInside() {
  for (let i = 1; i <= totalPages; i++) {
    let pageDiv = document.createElement("div");

    pageDiv.addEventListener("click", () => changePageHandler(i));
    pageDiv.className = "pageBtn";
    pageDiv.innerHTML = i;
    pagesContainer[0].appendChild(pageDiv);
  }
}

//сортировка столбцов
const sortFirstName = () => {
  mainData.sort((a, b) => {
    if (a.name.firstName > b.name.firstName) {
      return 1;
    } else if (a.name.firstName < b.name.firstName) {
      return -1;
    } else return 0;
  });
  changePageHandler(page);
};
const sortLastName = () => {
  mainData.sort((a, b) => {
    if (a.name.lastName > b.name.lastName) {
      return 1;
    } else if (a.name.lastName < b.name.lastName) {
      return -1;
    } else return 0;
  });
  changePageHandler(page);
};
const sortAbout = () => {
  mainData.sort((a, b) => {
    if (a.about > b.about) {
      return 1;
    } else if (a.about < b.about) {
      return -1;
    } else return 0;
  });
  changePageHandler(page);
};
const sortEyeColor = () => {
  mainData.sort((a, b) => {
    if (a.eyeColor > b.eyeColor) {
      return 1;
    } else if (a.eyeColor < b.eyeColor) {
      return -1;
    } else return 0;
  });
  changePageHandler(page);
};

firstName[0].addEventListener("click", sortFirstName);
lastName[0].addEventListener("click", sortLastName);
about[0].addEventListener("click", sortAbout);
eyeColor[0].addEventListener("click", sortEyeColor);
