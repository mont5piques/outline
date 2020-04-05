// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { debounce } from 'lodash';

import AuthStore from 'stores/AuthStore';
import UiStore from 'stores/UiStore';
import Checkbox from 'components/Checkbox';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';

type Props = {
  auth: AuthStore,
  ui: UiStore,
};

@observer
class Security extends React.Component<Props> {
  form: ?HTMLFormElement;

  @observable sharing: boolean;
  @observable documentEmbeds: boolean;
  @observable guestSignin: boolean;

  componentDidMount() {
    const { auth } = this.props;
    if (auth.team) {
      this.documentEmbeds = auth.team.documentEmbeds;
      this.guestSignin = auth.team.guestSignin;
      this.sharing = auth.team.sharing;
    }
  }

  handleChange = async (ev: SyntheticInputEvent<*>) => {
    switch (ev.target.name) {
      case 'sharing':
        this.sharing = ev.target.checked;
        break;
      case 'documentEmbeds':
        this.documentEmbeds = ev.target.checked;
        break;
      case 'guestSignin':
        this.guestSignin = ev.target.checked;
        break;
      default:
    }

    await this.props.auth.updateTeam({
      sharing: this.sharing,
      documentEmbeds: this.documentEmbeds,
      guestSignin: this.guestSignin,
    });
    this.showSuccessMessage();
  };

  showSuccessMessage = debounce(() => {
    this.props.ui.showToast('Paramètres enregistrés');
  }, 500);

  render() {
    const { team } = this.props.auth;

    return (
      <CenteredContent>
        <PageTitle title="Sécurité" />
        <h1>Sécurité</h1>
        <HelpText>
          Vous trouverez ici les paramètres impactant les accès, la sécurité
          et le contenu de votre base de connaissances.
        </HelpText>

        <Checkbox
          label="Autoriser les invités"
          name="guestSignin"
          checked={this.guestSignin}
          onChange={this.handleChange}
          note={`Si activé, les personnes invités par mail pourront s'identifier sans avoir à utiliser ${
            team ? team.signinMethods : 'SSO'
          }`}
        />
        <Checkbox
          label="Partage public de documents"
          name="sharing"
          checked={this.sharing}
          onChange={this.handleChange}
          note="Si activé, les documents peuvent être publiquement partagé par n'importe quel membre"
        />
        <Checkbox
          label="Intégration de contenus riches"
          name="documentEmbeds"
          checked={this.documentEmbeds}
          onChange={this.handleChange}
          note="Convertit les liens de services supportés en contenus intégrés dans vos documents"
        />
      </CenteredContent>
    );
  }
}

export default inject('auth', 'ui')(Security);
