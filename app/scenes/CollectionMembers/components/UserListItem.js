// @flow
import * as React from 'react';
import { PlusIcon } from 'outline-icons';
import Time from 'shared/components/Time';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Badge from 'components/Badge';
import ListItem from 'components/List/Item';
import User from 'models/User';

type Props = {
  user: User,
  canEdit: boolean,
  onAdd: () => void,
};

const UserListItem = ({ user, onAdd, canEdit }: Props) => {
  return (
    <ListItem
      title={user.name}
      image={<Avatar src={user.avatarUrl} size={40} />}
      subtitle={
        <React.Fragment>
          {user.lastActiveAt ? (
            <React.Fragment>
              Actif il y a <Time dateTime={user.lastActiveAt} />
            </React.Fragment>
          ) : (
            'Jamais identifié'
          )}
          {!user.lastActiveAt && <Badge>Invited</Badge>}
          {user.isAdmin && <Badge admin={user.isAdmin}>Administrateur</Badge>}
        </React.Fragment>
      }
      actions={
        canEdit ? (
          <Button type="button" onClick={onAdd} icon={<PlusIcon />} neutral>
            Ajouter
          </Button>
        ) : (
          undefined
        )
      }
    />
  );
};

export default UserListItem;
