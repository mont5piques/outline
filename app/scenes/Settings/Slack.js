// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { find } from 'lodash';
import styled from 'styled-components';

import Button from 'components/Button';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import SlackButton from './components/SlackButton';
import CollectionsStore from 'stores/CollectionsStore';
import IntegrationsStore from 'stores/IntegrationsStore';
import AuthStore from 'stores/AuthStore';
import Notice from 'shared/components/Notice';
import getQueryVariable from 'shared/utils/getQueryVariable';

type Props = {
  collections: CollectionsStore,
  integrations: IntegrationsStore,
  auth: AuthStore,
};

@observer
class Slack extends React.Component<Props> {
  error: ?string;

  componentDidMount() {
    this.error = getQueryVariable('error');
    this.props.collections.fetchPage({ limit: 100 });
    this.props.integrations.fetchPage();
  }

  get commandIntegration() {
    return find(this.props.integrations.slackIntegrations, {
      type: 'command',
    });
  }

  render() {
    const { collections, integrations, auth } = this.props;
    const teamId = auth.team ? auth.team.id : '';

    return (
      <CenteredContent>
        <PageTitle title="Slack" />
        <h1>Slack</h1>
        {this.error === 'access_denied' && (
          <Notice>
            Oops, vous devez accepter les permissions dans Slack afin d'y
            connecter Outline. Réessayer ?
          </Notice>
        )}
        {this.error === 'unauthenticated' && (
          <Notice>
            Une erreur a été rencontrée pendant la requête d'authentification.
            Essayez de vous reconnecter !
          </Notice>
        )}
        <HelpText>
          Prévisualiser les liens Outline que vos collègues partagent et
          utiliser la commande <Code>/outline</Code> dans Slack pour
          rechercher des documents dans le wiki de votre équipe.
        </HelpText>
        <p>
          {this.commandIntegration ? (
            <Button onClick={this.commandIntegration.delete}>Déconnecter</Button>
          ) : (
            <SlackButton
              scopes={['commands', 'links:read', 'links:write']}
              redirectUri={`${BASE_URL}/auth/slack.commands`}
              state={teamId}
            />
          )}
        </p>
        <p>&nbsp;</p>

        <h2>Collections</h2>
        <HelpText>
          Connecter les collections Outline à des chaînes Slack. Des
          notifications de création ou de modification de documents seront
          alors postés comme messages.
        </HelpText>

        <List>
          {collections.orderedData.map(collection => {
            const integration = find(integrations.slackIntegrations, {
              collectionId: collection.id,
            });

            if (integration) {
              return (
                <ListItem key={integration.id}>
                  <span>
                    <strong>L'activité sur {collection.name}</strong> est
                    postée sur la chaîne Slack{' '}
                    <strong>{integration.settings.channel}</strong>
                  </span>
                  <Button onClick={integration.delete}>Déconnecter</Button>
                </ListItem>
              );
            }

            return (
              <ListItem key={collection.id}>
                <strong>{collection.name}</strong>
                <SlackButton
                  scopes={['incoming-webhook']}
                  redirectUri={`${BASE_URL}/auth/slack.post`}
                  state={collection.id}
                  label="Connecter"
                />
              </ListItem>
            );
          })}
        </List>
      </CenteredContent>
    );
  }
}

const List = styled.ol`
  list-style: none;
  margin: 8px 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eaebea;
`;

const Code = styled.code`
  padding: 4px 6px;
  margin: 0 2px;
  background: #eaebea;
  border-radius: 4px;
`;

export default inject('collections', 'integrations', 'auth')(Slack);
