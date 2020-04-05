// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import BaseModal from 'components/Modal';
import UiStore from 'stores/UiStore';
import CollectionNew from 'scenes/CollectionNew';
import CollectionEdit from 'scenes/CollectionEdit';
import CollectionDelete from 'scenes/CollectionDelete';
import CollectionExport from 'scenes/CollectionExport';
import DocumentDelete from 'scenes/DocumentDelete';
import DocumentShare from 'scenes/DocumentShare';

type Props = {
  ui: UiStore,
};
@observer
class Modals extends React.Component<Props> {
  handleClose = () => {
    this.props.ui.clearActiveModal();
  };

  render() {
    const { activeModalName, activeModalProps } = this.props.ui;

    const Modal = ({ name, children, ...rest }) => {
      return (
        <BaseModal
          isOpen={activeModalName === name}
          onRequestClose={this.handleClose}
          {...rest}
        >
          {React.cloneElement(children, activeModalProps)}
        </BaseModal>
      );
    };

    return (
      <span>
        <Modal name="collection-new" title="Créer une collection">
          <CollectionNew onSubmit={this.handleClose} />
        </Modal>
        <Modal name="collection-edit" title="Modifier la collection">
          <CollectionEdit onSubmit={this.handleClose} />
        </Modal>
        <Modal name="collection-delete" title="Supprimer la collection">
          <CollectionDelete onSubmit={this.handleClose} />
        </Modal>
        <Modal name="collection-export" title="Exporter la collection">
          <CollectionExport onSubmit={this.handleClose} />
        </Modal>
        <Modal name="document-share" title="Partager le document">
          <DocumentShare onSubmit={this.handleClose} />
        </Modal>
        <Modal name="document-delete" title="Supprimer le document">
          <DocumentDelete onSubmit={this.handleClose} />
        </Modal>
      </span>
    );
  }
}

export default Modals;
