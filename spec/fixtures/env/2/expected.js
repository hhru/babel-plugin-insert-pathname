"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _Components = _interopRequireDefault(require("HHC/Components"));

var _popup = _interopRequireDefault(require("bloko/blocks/popup/popup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CartPopup(element) {
  function initPopup() {
    var $content = (0, _jquery["default"])('.HH-PriceCartPopup', element);
    (0, _jquery["default"])(element).on('hidPopup', function () {
      $content.removeClass('g-hidden');
    });
    return _Components["default"].make(_popup["default"], element, {});
  }

  var popup = initPopup();
  (0, _jquery["default"])('.HH-PriceCartPopup-Show').on('click', function () {
    popup.show();
  });
  return popup;
}

var _default = _Components["default"].build({
  create: CartPopup,
  componentName: "env/2/input"
});

exports["default"] = _default;