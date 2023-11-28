import React from "react";

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://blog.logrocket.com/wp-content/uploads/2023/11/use-css-anchor-positioning-nocdn.png" />
      </div>

      <div className="texts">
        <h2>What is anchor positioning in CSS?</h2>
        <p className="info">
          <a className="author">chen ifargan</a>
          <time>2023-11-28 10:30</time>
        </p>
        <p className="summary">
          The introduction of the official W3C specification, currently in an
          experimental stage, strongly suggests that this API was proposed
          because of the limitations associated with absolute positioning.
          Anchor positioning is based on the existing CSS concept of absolute
          positioning. It adds to the idea of tethering elements together by
          placing one element, A, relative to another element, B. Throughout
          this article, I refer to B as the “anchor element” and A as the
          “anchor target element.” Anchor positioning will enable more flexible
          element tethering, which was previously only possible with a
          combination of absolute positioning and JavaScript. With this new
          approach, your tethering code stays within the CSS layer and no longer
          requires JavaScript code, which may improve performance.
        </p>
      </div>
    </div>
  );
}

export default Post;
