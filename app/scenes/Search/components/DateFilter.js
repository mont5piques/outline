// @flow
import * as React from 'react';
import FilterOptions from './FilterOptions';

const options = [
  { key: undefined, label: "N'importe quand" },
  { key: 'day', label: 'Dernier jour' },
  { key: 'week', label: 'Dernière semaine' },
  { key: 'month', label: 'Dernier mois' },
  { key: 'year', label: 'Année dernière' },
];

type Props = {
  dateFilter: ?string,
  onSelect: (key: ?string) => void,
};

const DateFilter = ({ dateFilter, onSelect }: Props) => {
  return (
    <FilterOptions
      options={options}
      activeKey={dateFilter}
      onSelect={onSelect}
      defaultLabel="Any time"
    />
  );
};

export default DateFilter;
