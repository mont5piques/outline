// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';

import CenteredContent from 'components/CenteredContent';
import Empty from 'components/Empty';
import PageTitle from 'components/PageTitle';
import Heading from 'components/Heading';
import PaginatedDocumentList from 'components/PaginatedDocumentList';
import Subheading from 'components/Subheading';
import DocumentsStore from 'stores/DocumentsStore';

type Props = {
  documents: DocumentsStore,
};

@observer
class Archive extends React.Component<Props> {
  render() {
    const { documents } = this.props;

    return (
      <CenteredContent column auto>
        <PageTitle title="Archives" />
        <Heading>Archives</Heading>
        <PaginatedDocumentList
          documents={documents.archived}
          fetch={documents.fetchArchived}
          heading={<Subheading>Documents</Subheading>}
          empty={<Empty>La liste des documents archivés est vide pour le moment.</Empty>}
          showCollection
        />
      </CenteredContent>
    );
  }
}

export default inject('documents')(Archive);
