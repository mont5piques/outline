// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { PlusIcon } from 'outline-icons';
import Flex from 'shared/components/Flex';
import Empty from 'components/Empty';
import HelpText from 'components/HelpText';
import Subheading from 'components/Subheading';
import Button from 'components/Button';
import PaginatedList from 'components/PaginatedList';
import Modal from 'components/Modal';
import Group from 'models/Group';
import UiStore from 'stores/UiStore';
import AuthStore from 'stores/AuthStore';
import GroupMembershipsStore from 'stores/GroupMembershipsStore';
import UsersStore from 'stores/UsersStore';
import PoliciesStore from 'stores/PoliciesStore';
import GroupMemberListItem from './components/GroupMemberListItem';
import AddPeopleToGroup from './AddPeopleToGroup';

type Props = {
  ui: UiStore,
  auth: AuthStore,
  group: Group,
  users: UsersStore,
  policies: PoliciesStore,
  groupMemberships: GroupMembershipsStore,
};

@observer
class GroupMembers extends React.Component<Props> {
  @observable addModalOpen: boolean = false;

  handleAddModalOpen = () => {
    this.addModalOpen = true;
  };

  handleAddModalClose = () => {
    this.addModalOpen = false;
  };

  handleRemoveUser = async user => {
    try {
      await this.props.groupMemberships.delete({
        groupId: this.props.group.id,
        userId: user.id,
      });
      this.props.ui.showToast(`${user.name} a été retiré du groupe`);
    } catch (err) {
      this.props.ui.showToast("Impossible de retirer l'utilisateur");
    }
  };

  render() {
    const { group, users, groupMemberships, policies, auth } = this.props;
    const { user } = auth;
    if (!user) return null;

    const can = policies.abilities(group.id);

    return (
      <Flex column>
        {can.update ? (
          <React.Fragment>
            <HelpText>
              Ajouter ou supprimer des personnes dans
              le groupe <strong>{group.name}</strong>{' '}.
              Ajouter des personnes à ce groupe leur donnera accès aux
              collections déjà attribuées à ce groupe.
            </HelpText>
            <span>
              <Button
                type="button"
                onClick={this.handleAddModalOpen}
                icon={<PlusIcon />}
                neutral
              >
                Ajouter des personnes…
              </Button>
            </span>
          </React.Fragment>
        ) : (
          <HelpText>
            Liste des membres du groupe <strong>{group.name}</strong>.
          </HelpText>
        )}

        <Subheading>Membres</Subheading>
        <PaginatedList
          items={users.inGroup(group.id)}
          fetch={groupMemberships.fetchPage}
          options={{ id: group.id }}
          empty={<Empty>Ce groupe n'a aucun membre.</Empty>}
          renderItem={item => (
            <GroupMemberListItem
              key={item.id}
              user={item}
              membership={groupMemberships.get(`${item.id}-${group.id}`)}
              onRemove={
                can.update ? () => this.handleRemoveUser(item) : undefined
              }
            />
          )}
        />
        {can.update && (
          <Modal
            title={`Ajouter des personnes à ${group.name}`}
            onRequestClose={this.handleAddModalClose}
            isOpen={this.addModalOpen}
          >
            <AddPeopleToGroup
              group={group}
              onSubmit={this.handleAddModalClose}
            />
          </Modal>
        )}
      </Flex>
    );
  }
}

export default inject('auth', 'users', 'policies', 'groupMemberships', 'ui')(
  GroupMembers
);
