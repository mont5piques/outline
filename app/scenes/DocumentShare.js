// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/Button';
import CopyToClipboard from 'components/CopyToClipboard';
import HelpText from 'components/HelpText';
import Document from 'models/Document';

type Props = {
  document: Document,
  onSubmit: () => void,
};

@observer
class DocumentShare extends React.Component<Props> {
  @observable isCopied: boolean;
  timeout: TimeoutID;

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleCopied = () => {
    this.isCopied = true;

    this.timeout = setTimeout(() => {
      this.isCopied = false;
      this.props.onSubmit();
    }, 1500);
  };

  render() {
    const { document, onSubmit } = this.props;

    return (
      <div>
        <HelpText>
          Le lien ci-dessous permettra à quiconque le possédant d'accéder
          en lecture seule au document <strong>{document.title}</strong>. Vous
          pourriez révoquer ce lien à tout moment.{' '}
          <Link to="/settings/shares" onClick={onSubmit}>
            Gérer les liens partagés
          </Link>.
        </HelpText>
        <Input
          type="text"
          label="Share link"
          value={document.shareUrl || 'Chargement…'}
          readOnly
        />
        <CopyToClipboard
          text={document.shareUrl || ''}
          onCopy={this.handleCopied}
        >
          <Button type="submit" disabled={this.isCopied} primary>
            {this.isCopied ? 'Copié!' : 'Copier le lien'}
          </Button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default DocumentShare;
