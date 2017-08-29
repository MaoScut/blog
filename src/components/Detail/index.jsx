import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action/async';
// export default function () {
//   return (
//     <div>
//       detail!!!!???
//     </div>
//   );
// }
class Detail extends React.Component {
  componentDidMount() {
    this.props.actions.fetchExactArticle(this.props.match.params.articleId);
  }
  render() {
    let content = 'loading';
    if (this.props.article !== null) content = this.props.article.content;
    return (
      <div>
        {content}
      </div>
    );
  }
}
export default connect(
  state => ({
    article: state.article,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Detail);
