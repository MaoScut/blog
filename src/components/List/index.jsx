import React from 'react';
import Item from '../Item';

export default function List({ articles }) {
  let list = articles.map(article => <Item key={article.articleId}item={article} />);
  if (list.length === 0) list = 'loading';
  return (
    <ul>
      {list}
    </ul>
  );
}
