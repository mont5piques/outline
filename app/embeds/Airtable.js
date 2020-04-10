// @flow
import * as React from 'react';
import Frame from './components/Frame';

const URL_REGEX = new RegExp('https://airtable.com/(?:embed/)?(shr.*)$');

type Props = {
  url: string,
  matches: string[],
};

export default class Airtable extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render() {
    const { matches } = this.props;
    const shareId = matches[1];

    return (
      <Frame
        src={`https://airtable.com/embed/${shareId}`}
        title={`Airtable (${shareId})`}
        border
	height="600px"
      />
    );
  }
}
