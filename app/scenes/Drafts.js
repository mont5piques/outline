// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';

import Heading from 'components/Heading';
import CenteredContent from 'components/CenteredContent';
import Empty from 'components/Empty';
import PageTitle from 'components/PageTitle';
import PaginatedDocumentList from 'components/PaginatedDocumentList';
import Subheading from 'components/Subheading';
import InputSearch from 'components/InputSearch';
import NewDocumentMenu from 'menus/NewDocumentMenu';
import Actions, { Action } from 'components/Actions';
import DocumentsStore from 'stores/DocumentsStore';

type Props = {
  documents: DocumentsStore,
};

@observer
class Drafts extends React.Component<Props> {
  render() {
    const { fetchDrafts, drafts } = this.props.documents;

    return (
      <CenteredContent column auto>
        <PageTitle title="Brouillons" />
        <Heading>Brouillons</Heading>
        <PaginatedDocumentList
          heading={<Subheading>Documents</Subheading>}
          empty={<Empty>Vous ne disposez d'aucun brouillon pour le moment.</Empty>}
          fetch={fetchDrafts}
          documents={drafts}
          showDraft={false}
          showCollection
        />

        <Actions align="center" justify="flex-end">
          <Action>
            <InputSearch />
          </Action>
          <Action>
            <NewDocumentMenu />
          </Action>
        </Actions>
      </CenteredContent>
    );
  }
}

export default inject('documents')(Drafts);
