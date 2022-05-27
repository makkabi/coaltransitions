import React from 'react';

import style from './style';

import { getImage } from 'gatsby-plugin-image';
import Figure from '../../figure';

export default ({
  title,
  acf: { affiliation, background, email, phone, image, topics },
}) => {
  const imageData = getImage(image?.localFile);
  return (
    <div className="researcher" id={title.replace(' ', '-').toLowerCase()}>
      <style jsx>{style}</style>

      <style jsx>{`
        .researcher :global(.image-container img) {
          border-radius: 50%;
          max-width: 100%;
        }
      `}</style>
      <div className="image-container">
        {imageData && <Figure image={imageData} altText={image.altText} />}
      </div>

      <div className="content-container">
        <h3 className="title">{title}</h3>
        {background && (
          <p>
            <strong>Background:</strong> {background}
          </p>
        )}

        {topics && (
          <p>
            <strong>Focus topics:</strong> {topics}
          </p>
        )}

        {affiliation && (
          <p>
            <strong>Affiliation:</strong> {affiliation}
          </p>
        )}

        {email && (
          <p>
            <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}

        {phone && (
          <p>
            <strong>Telephone:</strong> <a href={`tel:${phone}`}>{phone}</a>
          </p>
        )}
      </div>
    </div>
  );
};
