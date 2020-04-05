// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';

import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import AuthStore from 'stores/AuthStore';

const ErrorSuspended = observer(({ auth }: { auth: AuthStore }) => {
  return (
    <CenteredContent>
      <PageTitle title="Votre compte a été suspendu" />
      <h1>
        <span role="img" aria-label="Warning sign">
          ⚠️
        </span>{' '}
        Votre compte a été suspendu
      </h1>

      <p>
        Un administrateur de l'équipe (<strong>{auth.suspendedContactEmail}</strong>)
        a suspendu votre compte. Pour le réactiver, veuillez vous adresser
        à eux directement.
      </p>
    </CenteredContent>
  );
});

export default inject('auth')(ErrorSuspended);
