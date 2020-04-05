// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from 'components/Button';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import Modal from 'components/Modal';
import AuthStore from 'stores/AuthStore';

type Props = {
  auth: AuthStore,
  onRequestClose: () => void,
};

@observer
class UserDelete extends React.Component<Props> {
  @observable isDeleting: boolean;

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    this.isDeleting = true;

    try {
      await this.props.auth.deleteUser();
      this.props.auth.logout();
    } finally {
      this.isDeleting = false;
    }
  };

  render() {
    const { auth, ...rest } = this.props;

    return (
      <Modal isOpen title="Supprimer le compte" {...rest}>
        <Flex column>
          <form onSubmit={this.handleSubmit}>
            <HelpText>
              Êtes-vous sûr ? Supprimer votre compte va détruire toutes les
              données associées à votre compte et cette action sera irréversible.
              Vous serez immédiatement déconnectés et vos clés d'API révoquées.
            </HelpText>
            <HelpText>
              <strong>Note:</strong> S'identifier à nouveau reprovisionnera
              votre compte à partir de zéro.
            </HelpText>
            <Button type="submit" danger>
              {this.isDeleting ? 'Suppression…' : 'Supprimer mon compte'}
            </Button>
          </form>
        </Flex>
      </Modal>
    );
  }
}

export default inject('auth')(UserDelete);
