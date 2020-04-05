// @flow
import * as React from 'react';
import { debounce } from 'lodash';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import Input from 'components/Input';
import Subheading from 'components/Subheading';
import NotificationListItem from './components/NotificationListItem';
import Notice from 'shared/components/Notice';

import UiStore from 'stores/UiStore';
import AuthStore from 'stores/AuthStore';
import NotificationSettingsStore from 'stores/NotificationSettingsStore';

type Props = {
  ui: UiStore,
  auth: AuthStore,
  notificationSettings: NotificationSettingsStore,
};

const options = [
  {
    event: 'documents.publish',
    title: 'Document publié',
    description: 'Recevoir une notification quand un nouveau document est publié',
  },
  {
    event: 'documents.update',
    title: 'Document modifié',
    description: 'Recevoir une notification quand un document que vous avez créé est modifié',
  },
  {
    event: 'collections.create',
    title: 'Collection créée',
    description: 'Recevoir une notification quand une nouvelle collection est créée',
  },
  {
    separator: true,
  },
  {
    event: 'emails.onboarding',
    title: 'Démarrage',
    description:
      "Quelques astuces pour bien commencer à utiliser les fonctionnalités d'Outline",
  },
  {
    event: 'emails.features',
    title: 'Nouvelles fonctionnalités',
    description: 'Recevoir un email quand de nouvelles fonctionnalités sont ajoutées',
  },
];

@observer
class Notifications extends React.Component<Props> {
  componentDidMount() {
    this.props.notificationSettings.fetchPage();
  }

  handleChange = async (ev: SyntheticInputEvent<>) => {
    const { notificationSettings } = this.props;
    const setting = notificationSettings.getByEvent(ev.target.name);

    if (ev.target.checked) {
      await notificationSettings.save({
        event: ev.target.name,
      });
    } else if (setting) {
      await notificationSettings.delete(setting);
    }

    this.showSuccessMessage();
  };

  showSuccessMessage = debounce(() => {
    this.props.ui.showToast('Notifications enregistrées');
  }, 500);

  render() {
    const { notificationSettings, auth } = this.props;
    const showSuccessNotice = window.location.search === '?success';
    const { user, team } = auth;
    if (!team || !user) return null;

    return (
      <CenteredContent>
        {showSuccessNotice && (
          <Notice>
            Désinscription réussie. Vos paramètres de notification on été
            prises en compte
          </Notice>
        )}

        <PageTitle title="Notifications" />
        <h1>Notifications</h1>

        <HelpText>
          Décidez où et quand vous allez recevoir des notifications par mail
          à partir d'Outline.
          Votre adresse mail pourraît être mise à jour à travers{' '}
          votre compte {team.slackConnected ? 'Slack' : 'Google'}.
        </HelpText>

        <Input
          type="email"
          value={user.email}
          label="Adresse mail"
          readOnly
          short
        />

        <Subheading>Notifications</Subheading>

        {options.map((option, index) => {
          if (option.separator) return <Separator key={`separator-${index}`} />;

          const setting = notificationSettings.getByEvent(option.event);

          return (
            <NotificationListItem
              key={option.event}
              onChange={this.handleChange}
              setting={setting}
              disabled={
                (setting && setting.isSaving) || notificationSettings.isFetching
              }
              {...option}
            />
          );
        })}
      </CenteredContent>
    );
  }
}

const Separator = styled.hr`
  padding-bottom: 12px;
`;

export default inject('notificationSettings', 'auth', 'ui')(Notifications);
