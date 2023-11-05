import React, { CSSProperties } from 'react';
import Magnifier, { MagnifierProps } from 'react-glass-magnifier';

interface ComponentProps extends MagnifierProps {
  className?: string
  width: CSSProperties["width"]
  height: CSSProperties["height"]
}
const MagnifierImage: React.FC<ComponentProps> = ({ className, width, height, ...rest }) => {
  return (
    <div className={className} style={{
      height: height,
      width: width
    }}>
      <Magnifier
        {...rest}
        zoomFactor={rest.zoomFactor || 2}
        glassDimension={rest.glassDimension || 250}
        glassBorderWidth={rest.glassBorderWidth || 5}
        largeImageUrl={rest.imageUrl}
        key={rest.imageUrl}
      />
    </div>
  );
};

export default MagnifierImage;
