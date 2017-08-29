import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Editor, EditorState } from 'draft-js';
import * as actions from '../../action/async';
// 先实现更新
class MyEditor extends React.Component {
  componentDidMount() {
    this.props.actions.fetchExactArticle(this.props.match.params.articleId);
  }
  render() {
    let title, articleType, content;
    let params = this.props.match.params;
    if (params.articleId === undefined) {
      // 没传入参数，那么对应新建文章，所有都显示为空
      [title, articleType, content] = ['', '', ''];
    } else if (this.props.article === null) {
      // 等待获取文章数据，显示loading
      [title, articleType, content] = ['loading', 'loading', 'loading'];      
    } else {
      // { title, articleType, content } = this.props.article;
      title = this.props.article.title;
      content = this.props.article.content;
      articleType = this.props.article.articleType;
    }
    return (
      <div>
        标题<input type="text" value={title} />
        分类<input type="text" value={articleType} />
        内容<input type="text" value={content} />
      </div>
    );
  }
}
// export default class MyEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = (editorState) => this.setState({editorState});
//   }
//   render() {
//     return <Editor editorState={this.state.editorState} onChange={this.onChange} />;
//   }
// }
// 纯函数组件是可以connect的
// function Editor ({ article }) {
//   const { title, articleType, content } = article;
//   return (
//     <div>
//       标题<input type="text" value={title} />
//       分类<input type="text" value={articleType} />
//       内容<input type="text" value={content} />
//     </div>
//   );
// }
export default connect(
  state => ({
    article: state.article,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(MyEditor);
