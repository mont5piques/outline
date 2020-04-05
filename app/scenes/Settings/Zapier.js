// @flow
import * as React from 'react';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import Button from 'components/Button';

class Zapier extends React.Component<*> {
  goToZapier = () => {
    window.open(
      'https://zapier.com/platform/public-invite/5927/a0b2747dbb017723b55fc54f4f0cdcae/'
    );
  };
  render() {
    return (
      <CenteredContent>
        <PageTitle title="Zapier" />
        <h1>Zapier</h1>
        <HelpText>
          Il y a maintenant une application Outline dans{' '}
          <a
            href="https://zapier.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Zapier
          </a>{' '}
          qui permet de facilier l'intégration avec des centaines d'autres
          services. Elle est cependant toujours en phase de développement.
          Pour utiliser les fonctionnalités d'intégration et ajouter des Hooks
          à votre wiki, il suffit simplement d'accepter l'invitation ci-dessous.
          La configuration sera ensuite finalisée dans Zapier.
        </HelpText>
        <p>
          <Button onClick={this.goToZapier}>Invitation publique Zapier</Button>
        </p>
      </CenteredContent>
    );
  }
}

export default Zapier;
