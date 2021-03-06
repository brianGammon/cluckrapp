import moment from 'moment';
import { sortBy, toPairs, fromPairs } from 'lodash';
import { dateStringAsMoment, nowAsMoment } from './dateHelper';
import { BULK_ENTRY_KEY } from '../constants';

export default (eggs, range) => {
  let totalCount = 0;
  let heaviestEgg = null;
  let highestWeight = 0;
  let totalWithWeight = 0;
  let totalWeight = 0;
  let earliestDate = null;
  let rangeForAverageCount = 0;
  let daysBackForAvg = 30;
  const now = nowAsMoment();
  const thirtyDaysAgo = now.clone().subtract(daysBackForAvg - 1, 'day');
  const firstOfMonth = range === 'allTime' ? null : moment.utc(`${range}-01`);
  const startofRange = range === 'allTime' ? thirtyDaysAgo : firstOfMonth;
  let eggsPerChicken = {};
  const eggsPerPeriod = {};

  if (range !== 'allTime') {
    if (now.format('YYYY-MM') === range) {
      // in current month, use number of days so far in month
      daysBackForAvg = now.diff(firstOfMonth, 'days') + 1;
    } else {
      // not current month, so use number of days in month
      daysBackForAvg = moment(range).daysInMonth();
    }
  }

  const sortedEggs = sortBy(eggs, 'date');
  if (sortedEggs.length === 0) {
    return null;
  }

  sortedEggs.forEach((egg) => {
    const thisEggDate = moment(egg.date);
    const quantity = +egg.quantity || 1;
    totalCount += quantity;

    if (!earliestDate) {
      earliestDate = egg.date;
    }

    // Keep track of the totals for individual hens
    if (egg.chickenId !== BULK_ENTRY_KEY) {
      if (!eggsPerChicken[egg.chickenId]) {
        eggsPerChicken[egg.chickenId] = 0;
      }
      eggsPerChicken[egg.chickenId] += quantity;
    }

    // Find heaviest & avg
    if (egg.weight) {
      totalWithWeight += 1;
      // Some weights are stored as strings (TODO)
      totalWeight += +egg.weight;
      if (+egg.weight > highestWeight) {
        heaviestEgg = egg;
        highestWeight = egg.weight;
      }
    }

    if (range === 'allTime' || thisEggDate.isAfter(startofRange)) {
      if (thisEggDate.isAfter(startofRange)) {
        rangeForAverageCount += quantity;
      }

      const rollupPeriod = range === 'allTime' ? egg.date.substring(0, 7) : egg.date;

      if (!eggsPerPeriod[rollupPeriod]) {
        eggsPerPeriod[rollupPeriod] = { total: 0, byChicken: {} };
      }

      eggsPerPeriod[rollupPeriod].total += quantity;
      if (egg.notes && egg.notes !== '') {
        eggsPerPeriod[rollupPeriod].hasNote = true;
      }
      if (egg.damaged) {
        eggsPerPeriod[rollupPeriod].hasDamaged = true;
      }
      if (egg.chickenId !== BULK_ENTRY_KEY) {
        eggsPerPeriod[rollupPeriod].byChicken[egg.chickenId] = (eggsPerPeriod[rollupPeriod].byChicken[egg.chickenId] || 0)
          + quantity;
      }
    }
  });

  const earliest = dateStringAsMoment(earliestDate);
  let daysToGoBack = daysBackForAvg;

  if (range === 'allTime' && earliest.isAfter(startofRange)) {
    const daysAfter = earliest.diff(startofRange, 'days');
    daysToGoBack = daysBackForAvg - daysAfter;
  }
  const averageNumber = rangeForAverageCount > 0 ? rangeForAverageCount / daysToGoBack : 0;

  // sort the eggPerPeriod by most eggs
  const array = toPairs(eggsPerChicken);
  const sortedArray = array.sort((a, b) => b[1] - a[1]);
  const topProducer = sortedArray.length > 1 && sortedArray[0][0];
  eggsPerChicken = fromPairs(sortedArray);

  const stats = {
    total: totalCount,
    heaviest: heaviestEgg,
    averageWeight: totalWithWeight > 0 ? totalWeight / totalWithWeight : null,
    averageNumber,
    firstEgg: earliestDate,
    mostEggs: topProducer,
    eggsPerChicken,
    eggsPerPeriod,
  };
  return stats;
};
