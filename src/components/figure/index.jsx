import React from 'react';

import style from './style';
import { GatsbyImage } from 'gatsby-plugin-image';

/**
 *  Replacement for the picture component from the first version
 *  of this site. This component uses GatsbyImage.
 * @param image
 * @param type
 * @param className
 * @param caption
 * @param captionClassName
 * @param rest
 * @returns {JSX.Element|null}
 */
export default ({
  image,
  caption = null,
  captionClassName = null,
  altText = '',
  className = '',
  ...rest
}) => {
  if (!image) {
    return null;
  }

  return (
    <figure {...rest}>
      <style jsx>{style}</style>

      <GatsbyImage alt={altText} image={image} />
      {caption && (
        <figcaption
          className={captionClassName}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};
