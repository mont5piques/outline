// @flow
import * as React from 'react';
import Frame from './components/Frame';

const URL_REGEX = /^https?:\/\/([0-9a-zA-Z_\-]*).sharepoint.com\/sites\/([0-9a-zA-Z_\-]+)\/_layouts\/([0-9]+)\/Doc.aspx\?(.*)$/;

type Props = {
  url: string,
  matches: string[],
};

export default class O365Document extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render() {
    const { matches } = this.props;
    const sharepointSpace = matches[1];
    const siteId = matches[2];
    const layout = matches[3];
    const paramStr = matches[4];

    return (
      <Frame
        src={`https://${sharepointSpace}.sharepoint.com/sites/${siteId}/_layouts/${layout}/Doc.aspx?${paramStr}`}
        title="Office 365 Embedded document"
      />
    );
  }
}
