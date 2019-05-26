import React, { Component } from 'react'

export class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="row">
          <div class="col s3">
            <p>
              <span className="commentAuthor">
                <b>Twoja stara</b>
              </span><br/>
              <span className="commentDate" style={{fontSize: 11}}>10:34:01 PM 25/05/2019</span>
            </p>
          </div>
          <div className="col s9">
            <p className="commentText">
              To jest testowy komentarz. Wjebałem tu w kurwe długą linię tekstu, żeby zobaczyć co się będzie działo. Lubię memy i wojaki. Elo elo elo elo elo elo tego typu benc. BONUS BONUS BONUS BONUS BONUS
            </p>
          </div>
        </div>
    </div>
    )
  }
}

export default Comment
