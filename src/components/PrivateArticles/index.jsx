import React from 'react';
import { ListFactory } from '../List';
import DeleteLi from '../OptionalItem';

const List = ListFactory(DeleteLi);
export default function ({ privateArticles, actions }) {
  return <List articles={privateArticles || []} onDelete={actions.deleteArticle} />;
}
