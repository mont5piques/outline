// @flow
import * as React from 'react';
import styled from 'styled-components';
import Key from 'components/Key';
import Flex from 'shared/components/Flex';
import HelpText from 'components/HelpText';
import { meta } from 'utils/keyboard';

function KeyboardShortcuts() {
  return (
    <Flex column>
      <HelpText>
        Outline est conçu pour une facilité et une rapidité d'utilisation.
        Tous vos raccourcis clavier habituel fonctionneront ici, il y a aussi
        Markdown.
      </HelpText>

      <h2>Navigation</h2>
      <List>
        <Keys>
          <Key>n</Key>
        </Keys>
        <Label>Nouveau document dans la collection en cours</Label>

        <Keys>
          <Key>e</Key>
        </Keys>
        <Label>Modifier le document ouvert</Label>

        <Keys>
          <Key>m</Key>
        </Keys>
        <Label>Déplacer le document ouvert</Label>

        <Keys>
          <Key>/</Key> ou <Key>t</Key>
        </Keys>
        <Label>Basculer en mode recherche</Label>

        <Keys>
          <Key>d</Key>
        </Keys>
        <Label>Aller à l'accueil</Label>

        <Keys>
          <Key>?</Key>
        </Keys>
        <Label>Ouvrir ce guide</Label>
      </List>

      <h2>Éditeur</h2>
      <List>
        <Keys>
          <Key>{meta}</Key> + <Key>Entrée</Key>
        </Keys>
        <Label>Sauvegarder et quitter le mode édition</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>Shift</Key> + <Key>p</Key>
        </Keys>
        <Label>Publier et quitter le mode édition</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>s</Key>
        </Keys>
        <Label>Sauvegarder et continuer l'édition</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>Échap</Key>
        </Keys>
        <Label>Annuler l'édition</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>b</Key>
        </Keys>
        <Label>Gras</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>i</Key>
        </Keys>
        <Label>Italique</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>u</Key>
        </Keys>
        <Label>Souligné</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>d</Key>
        </Keys>
        <Label>Barré</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>k</Key>
        </Keys>
        <Label>Lien</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>z</Key>
        </Keys>
        <Label>Annuler</Label>
        <Keys>
          <Key>{meta}</Key> + <Key>Shift</Key> + <Key>z</Key>
        </Keys>
        <Label>Rétablir</Label>
      </List>

      <h2>Markdown</h2>
      <List>
        <Keys>
          <Key>#</Key> <Key>Espace</Key>
        </Keys>
        <Label>Gros titre</Label>
        <Keys>
          <Key>##</Key> <Key>Espace</Key>
        </Keys>
        <Label>Titre moyen</Label>
        <Keys>
          <Key>###</Key> <Key>Espace</Key>
        </Keys>
        <Label>Petit titre</Label>

        <Keys>
          <Key>1.</Key> <Key>Espace</Key>
        </Keys>
        <Label>Liste numérotée</Label>
        <Keys>
          <Key>-</Key> <Key>Espace</Key>
        </Keys>
        <Label>Bulleted list</Label>
        <Keys>
          <Key>[ ]</Key> <Key>Espace</Key>
        </Keys>
        <Label>Todo list</Label>
        <Keys>
          <Key>&gt;</Key> <Key>Espace</Key>
        </Keys>
        <Label>Citation</Label>
        <Keys>
          <Key>---</Key>
        </Keys>
        <Label>Règle horizontale</Label>
        <Keys>
          <Key>{'```'}</Key>
        </Keys>
        <Label>Bloc code</Label>

        <Keys>_italique_</Keys>
        <Label>Italique</Label>
        <Keys>**gras**</Keys>
        <Label>Gras</Label>
        <Keys>~~barré~~</Keys>
        <Label>Barré</Label>
        <Keys>{'`code`'}</Keys>
        <Label>Code en ligne</Label>
      </List>
    </Flex>
  );
}

const List = styled.dl`
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const Keys = styled.dt`
  float: left;
  width: 25%;
  height: 30px;
  margin: 0;
`;

const Label = styled.dd`
  float: left;
  width: 75%;
  height: 30px;
  margin: 0;
  display: flex;
  align-items: center;
`;

export default KeyboardShortcuts;
