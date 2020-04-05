// @flow
import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import ApiKeysStore from 'stores/ApiKeysStore';

import Button from 'components/Button';
import Input from 'components/Input';
import CenteredContent from 'components/CenteredContent';
import PageTitle from 'components/PageTitle';
import HelpText from 'components/HelpText';
import List from 'components/List';
import TokenListItem from './components/TokenListItem';

type Props = {
  apiKeys: ApiKeysStore,
};

@observer
class Tokens extends React.Component<Props> {
  @observable name: string = '';

  componentDidMount() {
    this.props.apiKeys.fetchPage({ limit: 100 });
  }

  handleUpdate = (ev: SyntheticInputEvent<*>) => {
    this.name = ev.target.value;
  };

  handleSubmit = async (ev: SyntheticEvent<>) => {
    ev.preventDefault();
    await this.props.apiKeys.create({ name: this.name });
    this.name = '';
  };

  render() {
    const { apiKeys } = this.props;
    const hasApiKeys = apiKeys.orderedData.length > 0;

    return (
      <CenteredContent>
        <PageTitle title="Tokens d'API" />
        <h1>Tokens d'API</h1>

        <HelpText>
          Vous pouvez créer un nombre illimité de tokens personnels pour
          vous authentifier auprès de l'API. Pour plus de détails à propos de
          l'API, consultez la {' '}
          <a href="/developers">documentation API</a>.
        </HelpText>

        {hasApiKeys && (
          <List>
            {apiKeys.orderedData.map(token => (
              <TokenListItem
                key={token.id}
                token={token}
                onDelete={token.delete}
              />
            ))}
          </List>
        )}

        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleUpdate}
            placeholder="Identifiant du token (ex. développement)"
            value={this.name}
            required
          />
          <Button
            type="submit"
            value="Créer un Token"
            disabled={apiKeys.isSaving}
          />
        </form>
      </CenteredContent>
    );
  }
}

export default inject('apiKeys')(Tokens);
