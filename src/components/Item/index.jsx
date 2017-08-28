import React from 'react';
import { Link } from 'react-router-dom';

export default function Item({ item }) {
  return (
    <li>
      <Link to="/">{item.content}</Link>
    </li>
  );
}
