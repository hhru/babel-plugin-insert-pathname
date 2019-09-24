import $ from 'jquery';
import Components from 'HHC/Components';
import ShowAddress from 'HH/Maps/ShowAddress';
import CianPlacemarks from 'HH/Employer/CianPlacemarks/CianPlacemarks';

const PLACEMARK_Z_INDEX = 999;
function VacancyMap(element, params) {
    const address = Components.make(
        ShowAddress,
        element,
        $.extend({}, params.vacancyAddress, {
            placemarkZIndex: params.cianPlacemarks.showCianPlacemarks ? PLACEMARK_Z_INDEX + 1 : '',
        })
    );
    if (params.cianPlacemarks.showCianPlacemarks) {
        address.then(makeCianPlacemarks);
    }
    function makeCianPlacemarks(mapInstance) {
        Components.make(CianPlacemarks, element, {
            utmSource: params.cianPlacemarks.cianUtmSource,
            ymap: mapInstance,
            trl: params.cianPlacemarks.trl,
            placemarkZIndex: PLACEMARK_Z_INDEX,
            salaryFrom: params.cianPlacemarks.salaryFrom,
            salaryTo: params.cianPlacemarks.salaryTo,
            currencyCode: params.cianPlacemarks.currencyCode,
            originalRequestId: params.originalRequestId,
        });
    }
}
export default Components.build({
    create(element, params) {
        return new VacancyMap(element, params);
    },
});
