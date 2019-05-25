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
      <li>
        {editUrlMode ? (
          <input type="text" value={editUrl} onChange={this.onChangeEditUrl} />
        ) : (
          <span>
            <strong>
              Created by: {mem.username || mem.userId} <br />
              Title: {mem.title}
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
            <br />
            <img src={mem.url} alt="" />
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
          <span>
            <input
              type="text"
              value={comment}
              onChange={this.onChangeComment}
            />

            <button onClick={this.onSaveEditComment}>Add comment</button>
          </span>
        )}
      </li>
    );
  }
}

export default withFirebase(MemItem);
