import React from 'react';

require('./main.scss');
// require('./ionicons.css');

export default function () {
  return (
    <div className="header">
      <img src="/images/logo.png" alt="logo" />
      {/* <div className="search" /> */}
      <div className="right"><button>signup</button></div>
      <div className="right"><button>login</button></div>
      {/* <div><button>search</button></div>
      <div><button>more</button></div> */}
    </div>
  );
}
