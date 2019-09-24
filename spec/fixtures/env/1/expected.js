"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _Components = _interopRequireDefault(require("HHC/Components"));

var _ShowAddress = _interopRequireDefault(require("HH/Maps/ShowAddress"));

var _CianPlacemarks = _interopRequireDefault(require("HH/Employer/CianPlacemarks/CianPlacemarks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PLACEMARK_Z_INDEX = 999;

function VacancyMap(element, params) {
  var address = _Components["default"].make(_ShowAddress["default"], element, _jquery["default"].extend({}, params.vacancyAddress, {
    placemarkZIndex: params.cianPlacemarks.showCianPlacemarks ? PLACEMARK_Z_INDEX + 1 : ''
  }));

  if (params.cianPlacemarks.showCianPlacemarks) {
    address.then(makeCianPlacemarks);
  }

  function makeCianPlacemarks(mapInstance) {
    _Components["default"].make(_CianPlacemarks["default"], element, {
      utmSource: params.cianPlacemarks.cianUtmSource,
      ymap: mapInstance,
      trl: params.cianPlacemarks.trl,
      placemarkZIndex: PLACEMARK_Z_INDEX,
      salaryFrom: params.cianPlacemarks.salaryFrom,
      salaryTo: params.cianPlacemarks.salaryTo,
      currencyCode: params.cianPlacemarks.currencyCode,
      originalRequestId: params.originalRequestId
    });
  }
}

var _default = _Components["default"].build({
  create: function create(element, params) {
    return new VacancyMap(element, params);
  },
  componentName: "env/1/input"
});

exports["default"] = _default;