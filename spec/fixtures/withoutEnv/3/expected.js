import Components from 'HHC/Components';
import axios from 'HHC/Axios';
import notificationManager from 'bloko/blocks/notificationManager/notificationManager';
import LoadingSetter from 'bloko/common/loadingSetter';
let currentFilters = {};
const VacancyBlock = Components.build({
  create(element, {
    currentEmployerId,
    trl,
    siteId
  }) {
    const loading = element.querySelector('.HH-Employer-Vacancies-Loading');
    const loadingSetterInstance = new LoadingSetter(loading, 'EmployerVacanciesLoading');
    const vacanciesList = element.querySelector('.HH-Employer-Vacancies-List');

    async function applyFilter(filter) {
      try {
        vacanciesList.classList.add('g-hidden');
        loadingSetterInstance.start();
        const {
          data
        } = await axios.get('/shards/employerview/vacancies_groups', {
          params: { ...filter,
            currentEmployerId,
            siteId
          }
        });
        vacanciesList.innerHTML = data;
        Components.init(vacanciesList);
      } catch (e) {
        notificationManager.create({
          content: trl.error,
          type: 'error',
          autoClose: true
        });
      } finally {
        vacanciesList.classList.remove('g-hidden');
        loadingSetterInstance.stop();
      }
    }

    const publicInterface = {
      addFilter(filter) {
        Object.keys(filter).forEach(key => {
          if (!filter[key] || !filter[key].trim()) {
            delete currentFilters[key];
            return;
          }

          currentFilters[key] = filter[key].split(',');
        });
        return applyFilter(currentFilters);
      },

      groupByRegion() {
        currentFilters = {};
        return applyFilter({
          groupByRegion: true
        });
      }

    };
    return publicInterface;
  },

  componentName: "withoutEnv/3/input"
});

VacancyBlock.getCurrentFilters = () => currentFilters;

export default VacancyBlock;