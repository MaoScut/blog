import React from 'react';
import Item from '../Item';

export default function List({ articles, onDelete }) {
  if (!articles) {
    return (
      <div>
        loading...
      </div>
    );
  }
  function catchBubble(e) {
    if (e.target.className === 'delete-btn') {
      if (onDelete) onDelete(e.target.value);
    }
  }
  const list = articles.map(article => <Item key={article.articleId} item={article} />);
  return (
    <ul onClick={catchBubble} role="presentation">
      {list}
    </ul>
  );
}
export function ListFactory(child) {
  return function list (props) {
    if (!props.articles) {
      return (
        <div>
          loading...
        </div>
      );
    }
    function catchBubble(e) {
      if (e.target.className === 'delete-btn') {
        if (props.onDelete) props.onDelete(e.target.value);
      }
    }
    const list = props.articles.map(article => child({ item: article }));
    return (
      <ul onClick={catchBubble} role="presentation">
        {list}
      </ul>
    );
  };
}
