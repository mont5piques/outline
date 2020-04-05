// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from 'components/Button';
import Input from 'components/Input';
import HelpText from 'components/HelpText';
import Flex from 'shared/components/Flex';

import Group from 'models/Group';
import UiStore from 'stores/UiStore';

type Props = {
  history: RouterHistory,
  ui: UiStore,
  group: Group,
  onSubmit: () => void,
};

@observer
class GroupEdit extends React.Component<Props> {
  @observable name: string = this.props.group.name;
  @observable isSaving: boolean;

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    this.isSaving = true;

    try {
      await this.props.group.save({ name: this.name });
      this.props.onSubmit();
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
      <form onSubmit={this.handleSubmit}>
        <HelpText>
          Vous pouvez modifier le nom de ce groupe à tout moment. Cependant,
          le faire assez souvent va entraîner de la confusion chez vos
          collègues.
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

        <Button type="submit" disabled={this.isSaving || !this.name}>
          {this.isSaving ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
      </form>
    );
  }
}

export default inject('ui')(withRouter(GroupEdit));
