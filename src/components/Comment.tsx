import styles from "./Comment.module.css";
import { Avatar } from "./Avatar";
import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

/**
 * A reusable comment component.
 *
 *
 * @param {string} content The comment text.
 * @param {function} onDeleteComment The delete comment event handler.
 */
export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    console.log("Deletar comentário");
    onDeleteComment(content);
  }

  /**
   * Handles the like count of a comment.
   *
   * @remarks
   * Permits accessing the most recent state value.
   *
   * @example
   * setLikeCount((state) => {
   *   return state + 1;
   * });
   *
   * console.log(likeCount); // 0
   */
  function handleLikeCount() {
    setLikeCount((state) => {
      return state + 1;
    });

    // If I used setLikeCount in the normal way I would have the likeCounte value as 0
    console.log(likeCount);
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeCount}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
