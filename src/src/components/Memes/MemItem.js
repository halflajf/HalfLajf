import React, { Component } from "react";
import CommentList from "./CommentList";
import { withFirebase } from "../Firebase";

class MemItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editUrlMode: false,
      editUrl: this.props.mem.url,
      comment: "",
      likes: []
    };
  }
  onToggleEditUrlMode = () => {
    this.setState(state => ({
      editUrlMode: !state.editUrlMode,
      editUrl: this.props.mem.url
    }));
  };

  onChangeEditUrl = event => {
    this.setState({ editUrl: event.target.value });
  };

  onSaveEditUrl = () => {
    this.props.onEditMem(this.props.mem, this.state.editUrl);

    this.setState({ editUrlMode: false });
  };

  onSaveEditComment = () => {
    this.props.onAddComment(
      this.props.mem,
      this.state.comment,
      this.props.authUser
    );

    this.setState({ editUrlMode: false, comment: "" });
  };

  onChangeComment = event => {
    this.setState({ comment: event.target.value });
  };

  onLike = (mem, userId) => {
    let { likes, ...memSnapshot } = mem;

    let like = {
      userId: userId
    };

    if (!likes) likes = [];

    likes.push(like);
    this.props.firebase.likes(mem.uid).update({
      ...memSnapshot,
      likes
    });
  };
  onDislike = (mem, userId) => {
    let likes;
    if (mem.likes) {
      likes = Object.keys(mem.likes).map(key => ({
        ...mem.likes[key],
        uid: key
      }));

      const userLike = likes.filter(like => like.userId === userId);

      this.props.firebase.dislike(mem.uid, userLike[0].uid).remove();
    }
  };

  render() {
    const { authUser, mem } = this.props;
    const { editUrlMode, editUrl, comment } = this.state;

    return (
      <li className="card z-depth-1 meme-summary">
        {editUrlMode ? (
          <input type="text" value={editUrl} onChange={this.onChangeEditUrl} />
        ) : (
          <span className="card-image">
            <strong>
              <h2>{mem.title}</h2>
              Created by: {mem.username || mem.userId} <br />
              {!mem.editedAt ? (
                <div>
                  Created At:{" "}
                  {new Date(mem.createdAt).toLocaleTimeString("en-US")}{" "}
                  {new Date(mem.createdAt).toLocaleDateString("en-US")}
                </div>
              ) : (
                <div>
                  Edited At:{" "}
                  {new Date(mem.editedAt).toLocaleTimeString("en-US")}{" "}
                  {new Date(mem.editedAt).toLocaleDateString("en-US")}
                </div>
              )}
            </strong>{" "}
            <img style={{padding:4}} src={mem.url} alt="" />
          </span>
        )}
        {!authUser ? (
          <div>
            <span>Likes</span>{" "}
            {!mem.likes ? (
              <span>0</span>
            ) : (
              <span>{mem.likes.filter(like => like != null).length}</span>
            )}
          </div>
        ) : (
          <span>
            <div>
              <span>Likes</span>{" "}
              {!mem.likes ? (
                <span>
                  <span>0</span>
                  <button onClick={() => this.onLike(mem, authUser.uid)}>
                    like
                  </button>
                </span>
              ) : (
                <span>
                  <span>{mem.likes.filter(like => like != null).length}</span>
                  {mem.likes.filter(user => user.userId === authUser.uid)
                    .length ? (
                    <span>
                      <button onClick={() => this.onDislike(mem, authUser.uid)}>
                        dislike
                      </button>
                    </span>
                  ) : (
                    <button onClick={() => this.onLike(mem, authUser.uid)}>
                      like
                    </button>
                  )}
                </span>
              )}
            </div>
          </span>
        )}

        {mem.comments ? (
          <div>
            {" "}
            Comments:
            <CommentList
              comments={mem.comments}
              MemUid={mem.uid}
              authUser={authUser}
            />
          </div>
        ) : (
          <div>There are no comments ...</div>
        )}
        {!authUser ? (
          <span />
        ) : (
          <div>
          <div className="input-field" >  
          <i className="material-icons prefix">border_color</i>
            <input className="materialize-textarea" id="userComment"
              type="text"
              value={comment}
              onChange={this.onChangeComment}
            />
<label htmlFor="userComment">Share your thoughts about this meme</label>
          </div>
          <span className="input-field" style={{padding: 2}}>
            <button onClick={this.onSaveEditComment} className="btn orange darken-2 z-depth-1">Add comment</button>
            </span>
          </div>
        )}
      </li>
    );
  }
}

export default withFirebase(MemItem);
