// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import type { RouterHistory } from 'react-router-dom';
import {
  DocumentIcon,
  EmailIcon,
  ProfileIcon,
  PadlockIcon,
  CodeIcon,
  UserIcon,
  GroupIcon,
  LinkIcon,
  TeamIcon,
  BulletedListIcon,
} from 'outline-icons';
import ZapierIcon from './icons/Zapier';
import SlackIcon from './icons/Slack';

import Flex from 'shared/components/Flex';
import Sidebar from './Sidebar';
import Scrollable from 'components/Scrollable';
import Section from './components/Section';
import Header from './components/Header';
import SidebarLink from './components/SidebarLink';
import HeaderBlock from './components/HeaderBlock';
import PoliciesStore from 'stores/PoliciesStore';
import AuthStore from 'stores/AuthStore';

type Props = {
  history: RouterHistory,
  policies: PoliciesStore,
  auth: AuthStore,
};

@observer
class SettingsSidebar extends React.Component<Props> {
  returnToDashboard = () => {
    this.props.history.push('/');
  };

  render() {
    const { policies, auth } = this.props;
    const { team } = auth;
    if (!team) return null;

    const can = policies.abilities(team.id);

    return (
      <Sidebar>
        <HeaderBlock
          subheading="◄ Retour à l'application"
          teamName={team.name}
          logoUrl={team.avatarUrl}
          onClick={this.returnToDashboard}
        />

        <Flex auto column>
          <Scrollable shadow>
            <Section>
              <Header>Compte</Header>
              <SidebarLink
                to="/settings"
                icon={<ProfileIcon />}
                label="Profil"
              />
              <SidebarLink
                to="/settings/notifications"
                icon={<EmailIcon />}
                label="Notifications"
              />
              <SidebarLink
                to="/settings/tokens"
                icon={<CodeIcon />}
                label="Tokens d'API"
              />
            </Section>
            <Section>
              <Header>Équipe</Header>
              {can.update && (
                <SidebarLink
                  to="/settings/details"
                  icon={<TeamIcon />}
                  label="Détails"
                />
              )}
              {can.update && (
                <SidebarLink
                  to="/settings/security"
                  icon={<PadlockIcon />}
                  label="Sécurité"
                />
              )}
              <SidebarLink
                to="/settings/people"
                icon={<UserIcon />}
                exact={false}
                label="Personnes"
              />
              <SidebarLink
                to="/settings/groups"
                icon={<GroupIcon />}
                exact={false}
                label="Groupes"
              />
              <SidebarLink
                to="/settings/shares"
                icon={<LinkIcon />}
                label="Lien partagés"
              />
              {can.auditLog && (
                <SidebarLink
                  to="/settings/events"
                  icon={<BulletedListIcon />}
                  label="Journaux d'audit"
                />
              )}
              {can.export && (
                <SidebarLink
                  to="/settings/export"
                  icon={<DocumentIcon />}
                  label="Exporter les données"
                />
              )}
            </Section>
            {can.update && (
              <Section>
                <Header>Intégrations</Header>
                <SidebarLink
                  to="/settings/integrations/slack"
                  icon={<SlackIcon />}
                  label="Slack"
                />
                <SidebarLink
                  to="/settings/integrations/zapier"
                  icon={<ZapierIcon />}
                  label="Zapier"
                />
              </Section>
            )}
          </Scrollable>
        </Flex>
      </Sidebar>
    );
  }
}

export default inject('auth', 'policies')(SettingsSidebar);
