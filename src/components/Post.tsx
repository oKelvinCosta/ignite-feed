import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
} from "react";

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface PostProps {
  post: PostType;
}

export interface PostType {
  id: number;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  content: Content[]; // several objects with this format
  publishedAt: Date;
}

/**
 * A reusable post component.
 *
 * @param {object} props The component props.
 * @param {PostType} props.post The post data.
 */
export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["muito legal!"]);
  const [newCommentText, setNewCommentText] = useState("");

  /**
   * Formats the published date.
   *
   * @returns {string} The formatted date.
   */
  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  /**
   * Handles the creation of a new comment.
   *
   * @param {FormEvent} event The form submission event.
   */
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  /**
   * Handles the change of the new comment field.
   *
   * @param {ChangeEvent<HTMLTextAreaElement>} event The change event.
   */
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const fieldValue = event.target.value;
    setNewCommentText(fieldValue);
    event.target.setCustomValidity("");
  }

  /**
   * Deletes a comment.
   *
   * @param {string} commentToDelete The comment to be deleted.
   */
  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  /**
   * Handles the invalid event of the new comment field.
   *
   * @param {InvalidEvent<HTMLTextAreaElement>} event The invalid event.
   */
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("This field is required");
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      {/* Header */}
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />{" "}
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      {/* Content Post */}
      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
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
        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
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
