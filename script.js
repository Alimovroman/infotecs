const tbody = document.body.getElementsByClassName("tbody");
const pagesContainer = document.body.getElementsByClassName("pagesContainer");
const firstName = document.body.getElementsByClassName("firstName");
const lastName = document.body.getElementsByClassName("lastName");
const about = document.body.getElementsByClassName("about");
const eyeColor = document.body.getElementsByClassName("eyeColor");
const tableWrapper = document.body.getElementsByClassName("tableWrapper");
const eyeColorSelect = document.body.getElementsByClassName("eyeColorSelect");
const visibleFirstName =
  document.body.getElementsByClassName("visibleFirstName");

let mainData = [...data];
let totalPages = Math.floor(mainData.length / 10);
let page = 1;
let minCount = 0;
let maxCount = 10;
let dataOfPage = [];

const dataOfPageFilter = () => {
  dataOfPage = mainData.filter((e, i) => i >= minCount && i < maxCount);
};

//отрисовываем список пользователей
function createTable(tbody, array) {
  tbody.innerHTML = "";

  array.forEach((item) => {
    let tr = document.createElement("tr");
    let tdFirstName = document.createElement("td");
    let tdLastName = document.createElement("td");
    let tdAbout = document.createElement("td");
    let tdEyeColor = document.createElement("td");

    tdFirstName.className = `${item.id} tdFirstName`;
    tdLastName.className = item.id;
    tdAbout.className = `${item.id} tdAbout`;
    tdEyeColor.className = item.id;

    tdFirstName.innerText = item.name.firstName;
    tdLastName.innerText = item.name.lastName;
    tdAbout.innerText = item.about;
    tdEyeColor.innerText = item.eyeColor;

    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdAbout);
    tr.appendChild(tdEyeColor);
    tbody.appendChild(tr);

    tdFirstName.addEventListener("dblclick", (e) =>
      editFieldHandler(e, "firstName")
    );
    tdLastName.addEventListener("dblclick", (e) =>
      editFieldHandler(e, "lastName")
    );
    tdAbout.addEventListener("dblclick", (e) => editFieldHandler(e, "about"));
    tdEyeColor.addEventListener("dblclick", (e) =>
      editFieldHandler(e, "eyeColor")
    );
  });
}

//скрытие колонки
function showColumn(columnName) {
  const tdFirstName = document.body.getElementsByClassName("tdFirstName");
  switch (columnName) {
    case "firstName":
      for (let i = 0; i < tdFirstName.length; i++)
        tdFirstName[i].style.visibility = "hidden";
  }
}

//фильтр глаз

function filterEyes() {
  const pageBtn = document.body.getElementsByClassName("pageBtn");
  const countPage = pageBtn.length;
  page = 1;

  switch (this.value) {
    case "blue":
      mainData = data.filter((e) => e.eyeColor === this.value);
      break;
    case "red":
      mainData = data.filter((e) => e.eyeColor === this.value);
      break;
    case "green":
      mainData = data.filter((e) => e.eyeColor === this.value);
      break;
    case "brown":
      mainData = data.filter((e) => e.eyeColor === this.value);
      break;
    default:
      mainData = [...data];
  }

  for (let i = 0; i < countPage; i++) {
    pageBtn[0].remove();
  }
  totalPages = Math.ceil(mainData.length / 10);
  changePageHandler(page);
  createPagination();
}

//редактирование поля
function editFieldHandler(e, column) {
  let id;
  let mainTeg;
  if (column === "about") {
    id = e.target.className.split(" ")[0];
    mainTeg = `<textarea class='inputEdit' rows='5' cols='40'>${e.target.innerText}</textarea>`;
  } else if (column === "eyeColor") {
    id = e.target.className;
    mainTeg = `<select class='inputEdit'>
      <option value='blue'>blue</option>
      <option value='green'>green</option>
      <option value='brown'>brown</option>
      <option value='red'>red</option>
    </select>`;
  } else {
    id = e.target.className;
    mainTeg = `<input type='text' value=${e.target.innerText} class='inputEdit' />`;
  }

  let editTable = document.createElement("div");
  editTable.className = "editTable";
  editTable.innerHTML = `<div><div>Edit the field</div>${mainTeg}<button class='btnSave'>Save</button</div>`;
  tableWrapper[0].appendChild(editTable);

  saveEditField(id, column);
}

function saveEditField(id, column) {
  const editTable = document.body.getElementsByClassName("editTable");
  const btnSave = document.body.getElementsByClassName("btnSave");
  btnSave[0].onclick = function () {
    const inputEdit = document.body.getElementsByClassName("inputEdit");

    switch (column) {
      case "firstName":
        mainData = mainData.map((e) =>
          e.id === id
            ? (e = { ...e, name: { ...e.name, firstName: inputEdit[0].value } })
            : { ...e }
        );
        break;
      case "lastName":
        mainData = mainData.map((e) =>
          e.id === id
            ? (e = { ...e, name: { ...e.name, lastName: inputEdit[0].value } })
            : { ...e }
        );
        break;
      case "about":
        mainData = mainData.map((e) =>
          e.id === id ? (e = { ...e, about: inputEdit[0].value }) : { ...e }
        );
        break;
      case "eyeColor":
        mainData = mainData.map((e) =>
          e.id === id
            ? (e = {
                ...e,
                eyeColor:
                  inputEdit[0].options[inputEdit[0].selectedIndex].value,
              })
            : { ...e }
        );
        break;
    }

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
function createPagination() {
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

dataOfPageFilter();
createTable(tbody[0], dataOfPage);
createPagination();
eyeColorSelect[0].addEventListener("change", filterEyes);
firstName[0].addEventListener("click", sortFirstName);
lastName[0].addEventListener("click", sortLastName);
about[0].addEventListener("click", sortAbout);
eyeColor[0].addEventListener("click", sortEyeColor);
visibleFirstName[0].addEventListener("click", () => showColumn("firstName"));
