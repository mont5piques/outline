// @flow
import * as React from 'react';
import FilterOptions from './FilterOptions';

const options = [
  {
    key: undefined,
    label: 'Documents actifs',
    note: 'Documents dans les collections dont vous avez accès',
  },
  {
    key: 'true',
    label: 'Tous les documents',
    note: 'Inclut les documents archivés',
  },
];

type Props = {
  includeArchived: boolean,
  onSelect: (key: ?string) => void,
};

const StatusFilter = ({ includeArchived, onSelect }: Props) => {
  return (
    <FilterOptions
      options={options}
      activeKey={includeArchived ? 'true' : undefined}
      onSelect={onSelect}
      defaultLabel="Documents actifs"
    />
  );
};

export default StatusFilter;
