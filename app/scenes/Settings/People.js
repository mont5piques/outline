// @flow
import * as React from 'react';
import invariant from 'invariant';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { PlusIcon } from 'outline-icons';

import Empty from 'components/Empty';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Invite from 'scenes/Invite';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import PaginatedList from 'components/PaginatedList';
import Tabs, { Separator } from 'components/Tabs';
import Tab from 'components/Tab';
import UserListItem from './components/UserListItem';

import AuthStore from 'stores/AuthStore';
import UsersStore from 'stores/UsersStore';
import PoliciesStore from 'stores/PoliciesStore';

type Props = {
  auth: AuthStore,
  users: UsersStore,
  policies: PoliciesStore,
  match: Object,
};

@observer
class People extends React.Component<Props> {
  @observable inviteModalOpen: boolean = false;

  handleInviteModalOpen = () => {
    this.inviteModalOpen = true;
  };

  handleInviteModalClose = () => {
    this.inviteModalOpen = false;
  };

  render() {
    const { auth, policies, match } = this.props;
    const { filter } = match.params;
    const currentUser = auth.user;
    const team = auth.team;
    invariant(currentUser, "L'utilisateur devrait exister");
    invariant(team, "L'équipe devrait exister");

    let users = this.props.users.active;
    if (filter === 'all') {
      users = this.props.users.all;
    } else if (filter === 'admins') {
      users = this.props.users.admins;
    } else if (filter === 'suspended') {
      users = this.props.users.suspended;
    } else if (filter === 'invited') {
      users = this.props.users.invited;
    }

    const can = policies.abilities(team.id);

    return (
      <CenteredContent>
        <PageTitle title="Personnes" />
        <h1>Personnes</h1>
        <HelpText>
          Toute personne s'ayant connectée à Outline apparaît ici. Il est
          cependant possible qu'il y ait d'autres utilisateurs qui peuvent
          avoir accès à Outline via {team.signinMethods} mais qui ne se
          sont pas encore identfiés.
        </HelpText>
        <Button
          type="button"
          data-on="click"
          data-event-category="invite"
          data-event-action="peoplePage"
          onClick={this.handleInviteModalOpen}
          icon={<PlusIcon />}
          neutral
        >
          Inviter des personnes…
        </Button>

        <Tabs>
          <Tab to="/settings/people" exact>
            Actifs
          </Tab>
          <Tab to="/settings/people/admins" exact>
            Administrateurs
          </Tab>
          {can.update && (
            <Tab to="/settings/people/suspended" exact>
              Suspendus
            </Tab>
          )}
          <Tab to="/settings/people/all" exact>
            Tout le monde
          </Tab>

          {can.invite && (
            <React.Fragment>
              <Separator />
              <Tab to="/settings/people/invited" exact>
                Invités
              </Tab>
            </React.Fragment>
          )}
        </Tabs>
        <PaginatedList
          items={users}
          empty={<Empty>Aucune personne à lister.</Empty>}
          fetch={this.props.users.fetchPage}
          renderItem={item => (
            <UserListItem
              key={item.id}
              user={item}
              showMenu={can.update && currentUser.id !== item.id}
            />
          )}
        />

        <Modal
          title="Inviter des personnes"
          onRequestClose={this.handleInviteModalClose}
          isOpen={this.inviteModalOpen}
        >
          <Invite onSubmit={this.handleInviteModalClose} />
        </Modal>
      </CenteredContent>
    );
  }
}

export default inject('auth', 'users', 'policies')(People);
