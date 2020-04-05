// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { debounce } from 'lodash';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import Input from 'components/Input';
import Modal from 'components/Modal';
import Empty from 'components/Empty';
import PaginatedList from 'components/PaginatedList';
import Invite from 'scenes/Invite';
import Group from 'models/Group';
import UiStore from 'stores/UiStore';
import AuthStore from 'stores/AuthStore';
import UsersStore from 'stores/UsersStore';
import GroupMembershipsStore from 'stores/GroupMembershipsStore';
import GroupMemberListItem from './components/GroupMemberListItem';

type Props = {
  ui: UiStore,
  auth: AuthStore,
  group: Group,
  groupMemberships: GroupMembershipsStore,
  users: UsersStore,
  onSubmit: () => void,
};

@observer
class AddPeopleToGroup extends React.Component<Props> {
  @observable inviteModalOpen: boolean = false;
  @observable query: string = '';

  handleInviteModalOpen = () => {
    this.inviteModalOpen = true;
  };

  handleInviteModalClose = () => {
    this.inviteModalOpen = false;
  };

  handleFilter = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.query = ev.target.value;
    this.debouncedFetch();
  };

  debouncedFetch = debounce(() => {
    this.props.users.fetchPage({
      query: this.query,
    });
  }, 250);

  handleAddUser = async user => {
    try {
      await this.props.groupMemberships.create({
        groupId: this.props.group.id,
        userId: user.id,
      });
      this.props.ui.showToast(`${user.name} a été ajouté au groupe`);
    } catch (err) {
      this.props.ui.showToast("Impossible d'ajouter l'utilisateur");
    }
  };

  render() {
    const { users, group, auth } = this.props;
    const { user, team } = auth;
    if (!user || !team) return null;

    return (
      <Flex column>
        <HelpText>
          Ajoutez des personnes ci-dessous pour les intégrer au groupe.
          Une personne manque à l'appel ?{' '}
          <a role="button" onClick={this.handleInviteModalOpen}>
            Invite-les à rejoindre {team.name}
          </a>.
        </HelpText>

        <Input
          type="search"
          placeholder="Rechercher par nom…"
          value={this.query}
          onChange={this.handleFilter}
          label="Rechercher des personnes"
          labelHidden
          autoFocus
          flex
        />
        <PaginatedList
          empty={
            this.query ? (
              <Empty>Aucune personne ne correspond à votre requête</Empty>
            ) : (
              <Empty>Aucune autre personne à ajouter</Empty>
            )
          }
          items={users.notInGroup(group.id, this.query)}
          fetch={this.query ? undefined : users.fetchPage}
          renderItem={item => (
            <GroupMemberListItem
              key={item.id}
              user={item}
              onAdd={() => this.handleAddUser(item)}
              canEdit
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
      </Flex>
    );
  }
}

export default inject('auth', 'users', 'groupMemberships', 'ui')(
  AddPeopleToGroup
);
