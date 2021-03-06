// @flow
import { Node, Editor } from 'slate';
import Placeholder from 'rich-markdown-editor/lib/plugins/Placeholder';
import isModKey from 'rich-markdown-editor/lib/lib/isModKey';

export default [
  Placeholder({
    placeholder: 'Nomme ton document…',
    when: (editor: Editor, node: Node) => {
      if (editor.readOnly) return false;
      if (node.object !== 'block') return false;
      if (node.type !== 'heading1') return false;
      if (node.text !== '') return false;
      if (editor.value.document.nodes.first() !== node) return false;
      return true;
    },
  }),
  Placeholder({
    placeholder: '… et libère ta créativité',
    when: (editor: Editor, node: Node) => {
      if (editor.readOnly) return false;
      if (node.object !== 'block') return false;
      if (node.type !== 'paragraph') return false;
      if (node.text !== '') return false;
      if (editor.value.document.getDepth(node.key) !== 1) return false;
      return true;
    },
  }),
  {
    onKeyDown(ev: SyntheticKeyboardEvent<>, editor: Editor, next: Function) {
      if (ev.key === 'p' && ev.shiftKey && isModKey(ev)) {
        return editor.props.onPublish(ev);
      }

      return next();
    },
  },
];
