// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Input from 'components/Input';
import InputRich from 'components/InputRich';
import Button from 'components/Button';
import Switch from 'components/Switch';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import ColorPicker from 'components/ColorPicker';
import Collection from 'models/Collection';
import UiStore from 'stores/UiStore';

type Props = {
  collection: Collection,
  ui: UiStore,
  onSubmit: () => void,
};

@observer
class CollectionEdit extends React.Component<Props> {
  @observable name: string;
  @observable description: string = '';
  @observable color: string = '#4E5C6E';
  @observable isSaving: boolean;
  @observable private: boolean = false;

  componentDidMount() {
    this.name = this.props.collection.name;
    this.description = this.props.collection.description;
    this.color = this.props.collection.color;
    this.private = this.props.collection.private;
  }

  handleSubmit = async (ev: SyntheticEvent<*>) => {
    ev.preventDefault();
    this.isSaving = true;

    try {
      await this.props.collection.save({
        name: this.name,
        description: this.description,
        color: this.color,
        private: this.private,
      });
      this.props.onSubmit();
      this.props.ui.showToast('La collection a été mise à jour');
    } catch (err) {
      this.props.ui.showToast(err.message);
    } finally {
      this.isSaving = false;
    }
  };

  handleDescriptionChange = getValue => {
    this.description = getValue();
  };

  handleNameChange = (ev: SyntheticInputEvent<*>) => {
    this.name = ev.target.value;
  };

  handleColor = (color: string) => {
    this.color = color;
  };

  handlePrivateChange = (ev: SyntheticInputEvent<*>) => {
    this.private = ev.target.checked;
  };

  render() {
    return (
      <Flex column>
        <form onSubmit={this.handleSubmit}>
          <HelpText>
            Vous pouvez modifier le nom et les autres détails à tout moment.
            Cependant, des modifications fréquentes va entraîner de la confusion
            chez vos collègues.
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
            &nbsp;<ColorPicker onChange={this.handleColor} value={this.color} />
          </Flex>
          <InputRich
            id={this.props.collection.id}
            label="Description"
            onChange={this.handleDescriptionChange}
            defaultValue={this.description || ''}
            placeholder="Décrivez cette collection…"
            minHeight={68}
            maxHeight={200}
          />
          <Switch
            id="private"
            label="Collection privée"
            onChange={this.handlePrivateChange}
            checked={this.private}
          />
          <HelpText>
            Une collection privée sera visible uniquement pour certains membres.
          </HelpText>
          <Button
            type="submit"
            disabled={this.isSaving || !this.props.collection.name}
          >
            {this.isSaving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </form>
      </Flex>
    );
  }
}

export default inject('ui')(CollectionEdit);
