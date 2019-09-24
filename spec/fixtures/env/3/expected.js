"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Components = _interopRequireDefault(require("HHC/Components"));

var _Axios = _interopRequireDefault(require("HHC/Axios"));

var _notificationManager = _interopRequireDefault(require("bloko/blocks/notificationManager/notificationManager"));

var _loadingSetter = _interopRequireDefault(require("bloko/common/loadingSetter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var currentFilters = {};

var VacancyBlock = _Components["default"].build({
  create: function create(element, _ref) {
    var currentEmployerId = _ref.currentEmployerId,
        trl = _ref.trl,
        siteId = _ref.siteId;
    var loading = element.querySelector('.HH-Employer-Vacancies-Loading');
    var loadingSetterInstance = new _loadingSetter["default"](loading, 'EmployerVacanciesLoading');
    var vacanciesList = element.querySelector('.HH-Employer-Vacancies-List');

    function applyFilter(_x) {
      return _applyFilter.apply(this, arguments);
    }

    function _applyFilter() {
      _applyFilter = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(filter) {
        var _ref2, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                vacanciesList.classList.add('g-hidden');
                loadingSetterInstance.start();
                _context.next = 5;
                return _Axios["default"].get('/shards/employerview/vacancies_groups', {
                  params: _objectSpread({}, filter, {
                    currentEmployerId: currentEmployerId,
                    siteId: siteId
                  })
                });

              case 5:
                _ref2 = _context.sent;
                data = _ref2.data;
                vacanciesList.innerHTML = data;

                _Components["default"].init(vacanciesList);

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);

                _notificationManager["default"].create({
                  content: trl.error,
                  type: 'error',
                  autoClose: true
                });

              case 14:
                _context.prev = 14;
                vacanciesList.classList.remove('g-hidden');
                loadingSetterInstance.stop();
                return _context.finish(14);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11, 14, 18]]);
      }));
      return _applyFilter.apply(this, arguments);
    }

    var publicInterface = {
      addFilter: function addFilter(filter) {
        Object.keys(filter).forEach(function (key) {
          if (!filter[key] || !filter[key].trim()) {
            delete currentFilters[key];
            return;
          }

          currentFilters[key] = filter[key].split(',');
        });
        return applyFilter(currentFilters);
      },
      groupByRegion: function groupByRegion() {
        currentFilters = {};
        return applyFilter({
          groupByRegion: true
        });
      }
    };
    return publicInterface;
  },
  componentName: "env/3/input"
});

VacancyBlock.getCurrentFilters = function () {
  return currentFilters;
};

var _default = VacancyBlock;
exports["default"] = _default;