// @flow
import * as React from 'react';
import Frame from './components/Frame';

const URL_REGEX = new RegExp('https://seatable.nytrio.com/workspace/([0-9]+)/dtable/([^/]+)/\?(.+)$');

type Props = {
  url: string,
  matches: string[],
};

export default class Seatable extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render() {
    const { matches } = this.props;
    const workspaceId = matches[1];
    const base = matches[2];
    const params = matches[3];

    return (
      <Frame
        src={`https://seatable.nytrio.com/workspace/${workspaceId}/dtable/${base}/${params}`}
        title={`Seatable (${base})`}
        border
	height="600px"
      />
    );
  }
}
