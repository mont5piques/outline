// @flow
import * as React from 'react';
import { observable } from 'mobx';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { PlusIcon } from 'outline-icons';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import Subheading from 'components/Subheading';
import Button from 'components/Button';
import Empty from 'components/Empty';
import PaginatedList from 'components/PaginatedList';
import Modal from 'components/Modal';
import CollectionGroupMemberListItem from './components/CollectionGroupMemberListItem';
import Collection from 'models/Collection';
import UiStore from 'stores/UiStore';
import AuthStore from 'stores/AuthStore';
import MembershipsStore from 'stores/MembershipsStore';
import CollectionGroupMembershipsStore from 'stores/CollectionGroupMembershipsStore';
import UsersStore from 'stores/UsersStore';
import MemberListItem from './components/MemberListItem';
import AddPeopleToCollection from './AddPeopleToCollection';
import AddGroupsToCollection from './AddGroupsToCollection';
import GroupsStore from 'stores/GroupsStore';

type Props = {
  ui: UiStore,
  auth: AuthStore,
  collection: Collection,
  users: UsersStore,
  memberships: MembershipsStore,
  collectionGroupMemberships: CollectionGroupMembershipsStore,
  groups: GroupsStore,
  onEdit: () => void,
};

@observer
class CollectionMembers extends React.Component<Props> {
  @observable addGroupModalOpen: boolean = false;
  @observable addMemberModalOpen: boolean = false;

  handleAddGroupModalOpen = () => {
    this.addGroupModalOpen = true;
  };

  handleAddGroupModalClose = () => {
    this.addGroupModalOpen = false;
  };

  handleAddMemberModalOpen = () => {
    this.addMemberModalOpen = true;
  };

  handleAddMemberModalClose = () => {
    this.addMemberModalOpen = false;
  };

  handleRemoveUser = user => {
    try {
      this.props.memberships.delete({
        collectionId: this.props.collection.id,
        userId: user.id,
      });
      this.props.ui.showToast(`${user.name} a été retiré de la collection.`);
    } catch (err) {
      this.props.ui.showToast("Impossible de retirer l'utilisateur !");
    }
  };

  handleUpdateUser = (user, permission) => {
    try {
      this.props.memberships.create({
        collectionId: this.props.collection.id,
        userId: user.id,
        permission,
      });
      this.props.ui.showToast(`Les permissions de ${user.name} ont été mises à jour`);
    } catch (err) {
      this.props.ui.showToast("Impossible de mettre à jour l'utilisateur");
    }
  };

  handleRemoveGroup = group => {
    try {
      this.props.collectionGroupMemberships.delete({
        collectionId: this.props.collection.id,
        groupId: group.id,
      });
      this.props.ui.showToast(`${group.name} a été retiré de la collection`);
    } catch (err) {
      this.props.ui.showToast('Impossible de retirer le groupe');
    }
  };

  handleUpdateGroup = (group, permission) => {
    try {
      this.props.collectionGroupMemberships.create({
        collectionId: this.props.collection.id,
        groupId: group.id,
        permission,
      });
      this.props.ui.showToast(`Les permissions de ${group.name} ont été mises à jour`);
    } catch (err) {
      this.props.ui.showToast("Impossible de mettre à jour l'utilisateur");
    }
  };

  render() {
    const {
      collection,
      users,
      groups,
      memberships,
      collectionGroupMemberships,
      auth,
    } = this.props;
    const { user } = auth;
    if (!user) return null;

    const key = memberships.orderedData
      .map(m => m.permission)
      .concat(collection.private)
      .join('-');

    return (
      <Flex column>
        {collection.private ? (
          <React.Fragment>
            <HelpText>
              Choisissez les groupes et les membres qui auront un accès
              en lecture et en édition aux documents de la collection
              privée <strong>{collection.name}</strong>.{' '}
              Vous pouvez rendre cette collection visible à toute
              l'équipe en{' '}
              <a role="button" onClick={this.props.onEdit}>
                modifiant sa visibilité
              </a>.
            </HelpText>
            <span>
              <Button
                type="button"
                onClick={this.handleAddGroupModalOpen}
                icon={<PlusIcon />}
                neutral
              >
                Ajouter des groupes
              </Button>
            </span>
          </React.Fragment>
        ) : (
          <HelpText>
            La collection <strong>{collection.name}</strong> est accessible
            par tout le monde. Si vous souhaitez restreindre l'accès à cette
            collection,{' '}
            <a role="button" onClick={this.props.onEdit}>
              rendez-là privée
            </a>.
          </HelpText>
        )}

        {collection.private && (
          <GroupsWrap>
            <Subheading>Groupes</Subheading>
            <PaginatedList
              key={key}
              items={groups.inCollection(collection.id)}
              fetch={collectionGroupMemberships.fetchPage}
              options={collection.private ? { id: collection.id } : undefined}
              empty={<Empty>Aucun groupe n'est associé à la collection.</Empty>}
              renderItem={group => (
                <CollectionGroupMemberListItem
                  key={group.id}
                  group={group}
                  collectionGroupMembership={collectionGroupMemberships.get(
                    `${group.id}-${collection.id}`
                  )}
                  onRemove={() => this.handleRemoveGroup(group)}
                  onUpdate={permission =>
                    this.handleUpdateGroup(group, permission)
                  }
                />
              )}
            />
            <Modal
              title={`Ajouter des groupes à ${collection.name}`}
              onRequestClose={this.handleAddGroupModalClose}
              isOpen={this.addGroupModalOpen}
            >
              <AddGroupsToCollection
                collection={collection}
                onSubmit={this.handleAddGroupModalClose}
              />
            </Modal>
          </GroupsWrap>
        )}
        {collection.private ? (
          <React.Fragment>
            <span>
              <Button
                type="button"
                onClick={this.handleAddMemberModalOpen}
                icon={<PlusIcon />}
                neutral
              >
                Ajouter des membres individuels
              </Button>
            </span>

            <Subheading>Membres individuels</Subheading>
          </React.Fragment>
        ) : (
          <Subheading>Membres</Subheading>
        )}
        <PaginatedList
          key={key}
          items={
            collection.private
              ? users.inCollection(collection.id)
              : users.active
          }
          fetch={collection.private ? memberships.fetchPage : users.fetchPage}
          options={collection.private ? { id: collection.id } : undefined}
          renderItem={item => (
            <MemberListItem
              key={item.id}
              user={item}
              membership={memberships.get(`${item.id}-${collection.id}`)}
              canEdit={collection.private && item.id !== user.id}
              onRemove={() => this.handleRemoveUser(item)}
              onUpdate={permission => this.handleUpdateUser(item, permission)}
            />
          )}
        />
        <Modal
          title={`Ajouter des personnes à ${collection.name}`}
          onRequestClose={this.handleAddMemberModalClose}
          isOpen={this.addMemberModalOpen}
        >
          <AddPeopleToCollection
            collection={collection}
            onSubmit={this.handleAddMemberModalClose}
          />
        </Modal>
      </Flex>
    );
  }
}

const GroupsWrap = styled.div`
  margin-bottom: 50px;
`;

export default inject(
  'auth',
  'users',
  'memberships',
  'collectionGroupMemberships',
  'groups',
  'ui'
)(CollectionMembers);
