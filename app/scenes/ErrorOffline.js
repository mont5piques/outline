// @flow
import * as React from 'react';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import Empty from 'components/Empty';

const ErrorOffline = () => {
  return (
    <CenteredContent>
      <PageTitle title="Hors-ligne" />
      <h1>Hors-ligne</h1>
      <Empty>Impossible de charger le document en mode hors-connexion.</Empty>
    </CenteredContent>
  );
};

export default ErrorOffline;
