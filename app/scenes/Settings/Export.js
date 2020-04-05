// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import AuthStore from 'stores/AuthStore';
import CollectionsStore from 'stores/CollectionsStore';
import UiStore from 'stores/UiStore';

import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import Button from 'components/Button';

type Props = {
  auth: AuthStore,
  collections: CollectionsStore,
  ui: UiStore,
};

@observer
class Export extends React.Component<Props> {
  @observable isLoading: boolean = false;
  @observable isExporting: boolean = false;

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    this.isLoading = true;

    try {
      await this.props.collections.export();
      this.isExporting = true;
      this.props.ui.showToast('Export in progress…');
    } finally {
      this.isLoading = false;
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.user) return null;

    return (
      <CenteredContent>
        <PageTitle title="Export Data" />
        <h1>Exporter les données</h1>
        <HelpText>
          Exporter les documents de toute votre équipe peut prendre un certain
          temps qui dépedra de la taille de votre base de connaissances.
          Vous pouvez également exporter un document uniquement.
        </HelpText>
        <HelpText>
          Êtes-vous sûr de tout exporter ? Une fichier zip sera généré. Ce
          fichier contiendra toutes vos collections et documents au format
          Markdown. Il sera envoyé à <strong>{auth.user.email}</strong>.
        </HelpText>
        <Button
          type="submit"
          onClick={this.handleSubmit}
          disabled={this.isLoading || this.isExporting}
          primary
        >
          {this.isExporting
            ? 'Export en cours'
            : this.isLoading ? "Demande d'export…" : 'Exporter toutes les données'}
        </Button>
      </CenteredContent>
    );
  }
}

export default inject('auth', 'ui', 'collections')(Export);
