// import * as data from "./data.json";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var tbody = document.body.getElementsByClassName("tbody");
var pagesContainer = document.body.getElementsByClassName("pagesContainer");
var firstName = document.body.getElementsByClassName("firstName");
var lastName = document.body.getElementsByClassName("lastName");
var about = document.body.getElementsByClassName("about");
var eyeColor = document.body.getElementsByClassName("eyeColor");
var tableWrapper = document.body.getElementsByClassName("tableWrapper");
var eyeColorSelect = document.body.getElementsByClassName("eyeColorSelect");
var visibleFirstName = document.body.getElementsByClassName("visibleFirstName");
var visibleLastName = document.body.getElementsByClassName("visibleLastName");
var visibleAbout = document.body.getElementsByClassName("visibleAbout");
var visibleEyeColor = document.body.getElementsByClassName("visibleEyeColor");
var data = require("./data.json");
var mainData = __spreadArray([], data, true);
var totalPages = Math.floor(mainData.length / 10);
var page = 1;
var minCount = 0;
var maxCount = 10;
var dataOfPage = [];
var isShowFirstName = true;
var isShowLastName = true;
var isShowAbout = true;
var isShowEyeColor = true;
//Выводим по 10 пользователей
var dataOfPageFilter = function () {
    dataOfPage = mainData.filter(function (e, i) { return i >= minCount && i < maxCount; });
};
//добавляем пользователей в таблицу
function createTable(tbody, array) {
    tbody.innerHTML = "";
    array.forEach(function (item) {
        var tr = document.createElement("tr");
        var tdFirstName = document.createElement("td");
        var tdLastName = document.createElement("td");
        var tdAbout = document.createElement("td");
        var tdEyeColor = document.createElement("td");
        tdFirstName.className = "".concat(item.id, " tdFirstName");
        tdLastName.className = "".concat(item.id, " tdLastName");
        tdAbout.className = "".concat(item.id, " tdAbout");
        tdEyeColor.className = "".concat(item.id, " tdEyeColor");
        tdFirstName.innerText = item.name.firstName;
        tdLastName.innerText = item.name.lastName;
        tdAbout.innerText = item.about;
        tdEyeColor.innerText = item.eyeColor;
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdAbout);
        tr.appendChild(tdEyeColor);
        tbody.appendChild(tr);
        tdFirstName.addEventListener("dblclick", function (e) {
            return editFieldHandler(e, "firstName");
        });
        tdLastName.addEventListener("dblclick", function (e) {
            return editFieldHandler(e, "lastName");
        });
        tdAbout.addEventListener("dblclick", function (e) {
            return editFieldHandler(e, "about");
        });
        tdEyeColor.addEventListener("dblclick", function (e) {
            return editFieldHandler(e, "eyeColor");
        });
    });
}
//скрытие колонки
function showColumn(columnName) {
    var tdFirstName = document.body.getElementsByClassName("tdFirstName");
    var tdLastName = document.body.getElementsByClassName("tdLastName");
    var tdAbout = document.body.getElementsByClassName("tdAbout");
    var tdEyeColor = document.body.getElementsByClassName("tdEyeColor");
    var activeColumn;
    var isShowColumn = true;
    if (columnName === "firstName") {
        activeColumn = tdFirstName;
        isShowFirstName = !isShowFirstName;
        isShowColumn = isShowFirstName;
    }
    else if (columnName === "lastName") {
        activeColumn = tdLastName;
        isShowLastName = !isShowLastName;
        isShowColumn = isShowLastName;
    }
    else if (columnName === "about") {
        activeColumn = tdAbout;
        isShowAbout = !isShowAbout;
        isShowColumn = isShowAbout;
    }
    else {
        activeColumn = tdEyeColor;
        isShowEyeColor = !isShowEyeColor;
        isShowColumn = isShowEyeColor;
    }
    if (!isShowColumn) {
        for (var i = 0; i < activeColumn.length; i++)
            activeColumn[i].style.visibility = "hidden";
    }
    else {
        for (var i = 0; i < activeColumn.length; i++)
            activeColumn[i].style.visibility = "visible";
    }
}
//фильтр глаз
function filterEyes() {
    var _this = this;
    var pageBtn = document.body.getElementsByClassName("pageBtn");
    var countPage = pageBtn.length;
    page = 1;
    switch (this.value) {
        case "blue":
            mainData = data.filter(function (e) { return e.eyeColor === _this.value; });
            break;
        case "red":
            mainData = data.filter(function (e) { return e.eyeColor === _this.value; });
            break;
        case "green":
            mainData = data.filter(function (e) { return e.eyeColor === _this.value; });
            break;
        case "brown":
            mainData = data.filter(function (e) { return e.eyeColor === _this.value; });
            break;
        default:
            mainData = __spreadArray([], data, true);
    }
    for (var i = 0; i < countPage; i++) {
        pageBtn[0].remove();
    }
    totalPages = Math.ceil(mainData.length / 10);
    changePageHandler(page);
    createPagination();
}
//редактирование поля
function editFieldHandler(e, column) {
    var id;
    var mainTeg;
    if (column === "about") {
        id = e.target.className.split(" ")[0];
        mainTeg = "<textarea class='inputEdit' rows='5' cols='40'>".concat(e.target.innerText, "</textarea>");
    }
    else if (column === "eyeColor") {
        id = e.target.className;
        mainTeg = "<select class='inputEdit'>\n      <option value='blue'>blue</option>\n      <option value='green'>green</option>\n      <option value='brown'>brown</option>\n      <option value='red'>red</option>\n    </select>";
    }
    else {
        id = e.target.className;
        mainTeg = "<input type='text' value=".concat(e.target.innerText, " class='inputEdit' />");
    }
    var editTable = document.createElement("div");
    editTable.className = "editTable";
    editTable.innerHTML = "<div><div>Edit the field</div>".concat(mainTeg, "<button class='btnSave'>Save</button</div>");
    tableWrapper[0].appendChild(editTable);
    saveEditField(id, column);
}
function saveEditField(id, column) {
    var editTable = document.body.getElementsByClassName("editTable");
    var btnSave = document.body.getElementsByClassName("btnSave");
    btnSave[0].onclick = function () {
        var inputEdit = document.body.getElementsByClassName("inputEdit");
        switch (column) {
            case "firstName":
                mainData = mainData.map(function (e) {
                    return e.id === id
                        ? (e = __assign(__assign({}, e), { name: __assign(__assign({}, e.name), { firstName: inputEdit[0].value }) }))
                        : __assign({}, e);
                });
                break;
            case "lastName":
                mainData = mainData.map(function (e) {
                    return e.id === id
                        ? (e = __assign(__assign({}, e), { name: __assign(__assign({}, e.name), { lastName: inputEdit[0].value }) }))
                        : __assign({}, e);
                });
                break;
            case "about":
                mainData = mainData.map(function (e) {
                    return e.id === id ? (e = __assign(__assign({}, e), { about: inputEdit[0].value })) : __assign({}, e);
                });
                break;
            case "eyeColor":
                mainData = mainData.map(function (e) {
                    return e.id === id
                        ? (e = __assign(__assign({}, e), { eyeColor: inputEdit[0].options[inputEdit[0].selectedIndex].value }))
                        : __assign({}, e);
                });
                break;
        }
        changePageHandler(page);
        editTable[0].remove();
    };
}
// переключаем страницы
var changePageHandler = function (p) {
    page = p;
    minCount = p === 1 ? 0 : (p - 1) * 10;
    maxCount = p * 10;
    dataOfPageFilter();
    createTable(tbody[0], dataOfPage);
};
// создаем пагинацию и добавляем event
function createPagination() {
    var _loop_1 = function (i) {
        var pageDiv = document.createElement("div");
        pageDiv.addEventListener("click", function () { return changePageHandler(i); });
        pageDiv.className = "pageBtn";
        pageDiv.innerHTML = "" + i;
        pagesContainer[0].appendChild(pageDiv);
    };
    for (var i = 1; i <= totalPages; i++) {
        _loop_1(i);
    }
}
//сортировка столбцов
var sortFirstName = function () {
    mainData.sort(function (a, b) {
        if (a.name.firstName > b.name.firstName) {
            return 1;
        }
        else if (a.name.firstName < b.name.firstName) {
            return -1;
        }
        else
            return 0;
    });
    changePageHandler(page);
};
var sortLastName = function () {
    mainData.sort(function (a, b) {
        if (a.name.lastName > b.name.lastName) {
            return 1;
        }
        else if (a.name.lastName < b.name.lastName) {
            return -1;
        }
        else
            return 0;
    });
    changePageHandler(page);
};
var sortAbout = function () {
    mainData.sort(function (a, b) {
        if (a.about > b.about) {
            return 1;
        }
        else if (a.about < b.about) {
            return -1;
        }
        else
            return 0;
    });
    changePageHandler(page);
};
var sortEyeColor = function () {
    mainData.sort(function (a, b) {
        if (a.eyeColor > b.eyeColor) {
            return 1;
        }
        else if (a.eyeColor < b.eyeColor) {
            return -1;
        }
        else
            return 0;
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
visibleFirstName[0].addEventListener("click", function () { return showColumn("firstName"); });
visibleLastName[0].addEventListener("click", function () { return showColumn("lastName"); });
visibleAbout[0].addEventListener("click", function () { return showColumn("about"); });
visibleEyeColor[0].addEventListener("click", function () { return showColumn("eyeColor"); });
