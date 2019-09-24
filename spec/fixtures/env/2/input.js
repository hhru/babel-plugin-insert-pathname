import $ from 'jquery';
import Components from 'HHC/Components';
import Popup from 'bloko/blocks/popup/popup';

function CartPopup(element) {
    function initPopup() {
        const $content = $('.HH-PriceCartPopup', element);
        $(element).on('hidPopup', () => {
            $content.removeClass('g-hidden');
        });
        return Components.make(Popup, element, {});
    }
    const popup = initPopup();
    $('.HH-PriceCartPopup-Show').on('click', () => {
        popup.show();
    });
    return popup;
}
export default Components.build({ create: CartPopup });
