// @flow
import * as React from 'react';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import Empty from 'components/Empty';

const Error404 = () => {
  return (
    <CenteredContent>
      <PageTitle title="Page introuvable" />
      <h1>Page introuvable</h1>
      <Empty>
        Impossible de trouver la page que vous recherchez. Aller à la&nbsp;<a href="/">
          page d'accueil
        </a>?
      </Empty>
    </CenteredContent>
  );
};

export default Error404;
