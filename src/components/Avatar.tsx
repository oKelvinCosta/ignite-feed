import styles from "./Avatar.module.css";
import type { ImgHTMLAttributes } from "react";

// por herdar de ImgHTMLAttributes, eu posso usar o src
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean; // opcional
  alt?: string; // opcional
}

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
