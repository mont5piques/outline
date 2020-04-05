// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from 'components/Button';
import Input from 'components/Input';
import HelpText from 'components/HelpText';
import Modal from 'components/Modal';
import GroupMembers from 'scenes/GroupMembers';
import Flex from 'shared/components/Flex';

import Group from 'models/Group';
import GroupsStore from 'stores/GroupsStore';
import UiStore from 'stores/UiStore';

type Props = {
  history: RouterHistory,
  ui: UiStore,
  groups: GroupsStore,
  onSubmit: () => void,
};

@observer
class GroupNew extends React.Component<Props> {
  @observable name: string = '';
  @observable isSaving: boolean;
  @observable group: Group;

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    this.isSaving = true;
    const group = new Group(
      {
        name: this.name,
      },
      this.props.groups
    );

    try {
      this.group = await group.save();
    } catch (err) {
      this.props.ui.showToast(err.message);
    } finally {
      this.isSaving = false;
    }
  };

  handleNameChange = (ev: SyntheticInputEvent<*>) => {
    this.name = ev.target.value;
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <HelpText>
            Les groupes sont là pour vous permettre de vous organiser en
            équipes. Ils sont bien efficaces lorsqu'ils sont organisées
            autour d'une fonction ou d'une communauté — Support ou Développement
            par example.
          </HelpText>
          <Flex>
            <Input
              type="text"
              label="Nom"
              onChange={this.handleNameChange}
              value={this.name}
              required
              autoFocus
              flex
            />
          </Flex>
          <HelpText>Vous pourrez ajouter des membres au groupe plus tard.</HelpText>

          <Button type="submit" disabled={this.isSaving || !this.name}>
            {this.isSaving ? 'Création…' : 'Continuer'}
          </Button>
        </form>
        <Modal
          title="Membres du groupe"
          onRequestClose={this.props.onSubmit}
          isOpen={!!this.group}
        >
          <GroupMembers group={this.group} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default inject('groups', 'ui')(withRouter(GroupNew));
