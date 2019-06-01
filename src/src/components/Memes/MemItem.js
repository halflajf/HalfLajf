import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import CommentList from "./CommentList";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import './Counter.css'
import './MemItem.css'

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
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { authUser, mem } = this.props;
    const { editUrlMode, editUrl, comment } = this.state;

    return (
      <div className="card z-depth-1">
        <div className="card-content grey-text text-darken-3">
          <span style={{fontWeight: "bold"}} className="card-title">{mem.title}</span>
          <p>
            Posted by <b>{mem.username || mem.userId}</b><br/>
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
          </p>
          <p>
            Tags: {mem.tags}
          </p>
        </div>
        <div className="card-image">
          <img src={mem.url} alt="Yet another dank meme"/>
        </div>
        {!authUser ? (
          <div className="counter center">
            <p>
              {!mem.likes ? (
                <span>0</span>
              ) : (
                <span>{mem.likes.filter(like => like != null).length}</span>
              )}
              <span> likes</span>
              <p>
                You need to <Link to={ROUTES.SIGN_IN}>log in</Link> in order to vote and comment.
              </p>
            </p>
          </div>   
        ) : (
          <div className="counter center">
            {!mem.likes ? (
              <p>
                <span className="like-counter" >0</span>
                <a href='' onClick={this.handleSubmit}>
                  <i className="material-icons icons-likes icon-green" onClick={() => this.onLike(mem, authUser.uid)}>thumb_up</i>
                </a>
            </p>
            ) : (
              <p>
                {!!mem.likes.filter(user => user.userId === authUser.uid).length && 
                  <a href='' onClick={this.handleSubmit}>
                    <i className="material-icons icons-likes icon-red" onClick={() => this.onDislike(mem, authUser.uid)}>thumb_down</i>
                  </a>
                }
                <span className="like-counter" >{mem.likes.filter(like => like != null).length} likes</span>
                {!mem.likes.filter(user => user.userId === authUser.uid).length && 
                  <a href='' onClick={this.handleSubmit}>
                    <i className="material-icons icons-likes icon-green" onClick={() => this.onLike(mem, authUser.uid)}>thumb_up</i>
                  </a>
                }
              </p>
            )}
          </div>
        )}
        <div className="comment-section">
          {!authUser ? (
            <span />
          ) : (
            <div>
              <div className="input-field">
                <i className="material-icons prefix">border_color</i>
                <input className="materialize-textarea" id="userComment" type="text" value={comment} onChange={this.onChangeComment}/>
                <label htmlFor="userComment">
                  Share your thoughts about this meme
                </label>
              </div>
              <div className="input-field right-align">
                <button onClick={this.onSaveEditComment} className="btn orange darken-2 z-depth-1">
                  Add comment
                </button>
              </div>
            </div>
          )}
          <h5 style={{fontWeight: "bold"}}>Comments:</h5>
          {mem.comments ? (
            <CommentList
              comments={mem.comments}
              MemUid={mem.uid}
              authUser={authUser}
            />
          ) : (
            <div>There are no comments ...</div>
          )}
        </div>
      </div>
    );
  }
}

export default withFirebase(MemItem);
