// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from 'components/Button';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import Document from 'models/Document';
import DocumentsStore from 'stores/DocumentsStore';
import UiStore from 'stores/UiStore';
import { collectionUrl } from 'utils/routeHelpers';

type Props = {
  history: RouterHistory,
  document: Document,
  documents: DocumentsStore,
  ui: UiStore,
  onSubmit: () => void,
};

@observer
class DocumentDelete extends React.Component<Props> {
  @observable isDeleting: boolean;

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    this.isDeleting = true;

    try {
      await this.props.document.delete();
      if (this.props.ui.activeDocumentId === this.props.document.id) {
        this.props.history.push(
          collectionUrl(this.props.document.collectionId)
        );
      }
      this.props.onSubmit();
    } catch (err) {
      this.props.ui.showToast(err.message);
    } finally {
      this.isDeleting = false;
    }
  };

  render() {
    const { document } = this.props;

    return (
      <Flex column>
        <form onSubmit={this.handleSubmit}>
          <HelpText>
            Êtes-vous sûr ? Supprimer le document{' '}
            <strong>{document.title}</strong> va entraîner également la
            suppression de son historique et tous les sous-documents.
          </HelpText>
          {!document.isDraft &&
            !document.isArchived && (
              <HelpText>
                Si vous envisagez le référencement ou la restauration de ce
                document à l'avenir, vous avez également la possibilité de
                l'archiver.
              </HelpText>
            )}
          <Button type="submit" danger>
            {this.isDeleting ? 'Suppression…' : 'Je suis sûr – Supprimez-le'}
          </Button>
        </form>
      </Flex>
    );
  }
}

export default inject('documents', 'ui')(withRouter(DocumentDelete));
