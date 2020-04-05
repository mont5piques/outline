// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import SharesStore from 'stores/SharesStore';
import AuthStore from 'stores/AuthStore';

import ShareListItem from './components/ShareListItem';
import Empty from 'components/Empty';
import List from 'components/List';
import CenteredContent from 'components/CenteredContent';
import Subheading from 'components/Subheading';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';

type Props = {
  shares: SharesStore,
  auth: AuthStore,
};

@observer
class Shares extends React.Component<Props> {
  componentDidMount() {
    this.props.shares.fetchPage({ limit: 100 });
  }

  render() {
    const { shares, auth } = this.props;
    const { user } = auth;
    const canShareDocuments = auth.team && auth.team.sharing;
    const hasSharedDocuments = shares.orderedData.length > 0;

    return (
      <CenteredContent>
        <PageTitle title="Share Links" />
        <h1>Liens partagés</h1>
        <HelpText>
          Les documents partagés sont listés ici-bas. Toute personne disposant
          du lien d'accès peut avoir un accès en consultation au document
          jusqu'à ce que ce lien soit révoqué.
        </HelpText>
        {user &&
          user.isAdmin && (
            <HelpText>
              {!canShareDocuments && (
                <strong>Le partage est actuellement désactivé.</strong>
              )}{' '}
              Vous pouvez {canShareDocuments ? 'désactiver' : 'activer'} le
              partage public de documents depuis les <Link to="/settings/security">paramètres de sécurité</Link>.
            </HelpText>
          )}
        <Subheading>Documents partagés</Subheading>
        {hasSharedDocuments ? (
          <List>
            {shares.orderedData.map(share => (
              <ShareListItem key={share.id} share={share} />
            ))}
          </List>
        ) : (
          <Empty>Aucun lien partagé, pour l'instant.</Empty>
        )}
      </CenteredContent>
    );
  }
}

export default inject('shares', 'auth')(Shares);
