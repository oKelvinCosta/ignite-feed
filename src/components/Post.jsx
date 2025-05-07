import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(["muito legal!"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment() {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange() {
    const fieldValue = event.target.value;
    setNewCommentText(fieldValue);
    event.target.setCustomValidity("");
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatorio");
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      {/* Header */}
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />{" "}
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      {/* Content Post */}
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      {/* Feedback */}
      <div>
        <form
          onSubmit={() => handleCreateNewComment()}
          className={styles.commentForm}
        >
          <strong>Deixe seu feedback</strong>

          <textarea
            value={newCommentText}
            onChange={handleNewCommentChange}
            name="comment"
            placeholder="Deixe um comentário"
            onInvalid={handleNewCommentInvalid}
            required
          />

          <footer>
            <button type="submit" disabled={isNewCommentEmpty}>
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map((comment) => (
            <Comment
              content={comment}
              onDeleteComment={deleteComment}
              key={comment}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
