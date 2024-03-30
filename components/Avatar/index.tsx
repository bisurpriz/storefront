import Image from 'next/image';
import {FC} from "react";

interface AvatarProps {
  imageUrl: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: FC<AvatarProps> = ({ imageUrl, alt, size = 'medium' }) => {
  const avatarSizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const avatarSize = avatarSizeClasses[size];


  return (
    <Image
      className={`rounded-full ${avatarSize} object-cover`}
      src={imageUrl}
      alt={alt}
      width={64}
      height={64}
    />
  );
};

export default Avatar;
