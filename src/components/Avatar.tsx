import styles from "./Avatar.module.css";
import type { ImgHTMLAttributes } from "react";

// I can use src from ImgHTMLAttributes because this inherit src
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean; // optional
  alt?: string; // optional
}

/**
 * A reusable avatar component.
 *
 * @param {object} props The component props.
 * @param {string} props.src The avatar image URL.
 * @param {boolean} props.hasBorder Whether to display a border around the avatar.
 */
export function Avatar({ hasBorder = true, src, alt, ...props }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
      {...props}
    />
  );
}
