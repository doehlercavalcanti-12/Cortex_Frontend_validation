import type { FC } from 'react';

type AvatarPreviewProps = {
  name: string;
  accent: string;
};

const AvatarPreview: FC<AvatarPreviewProps> = ({ name, accent }) => {
  return (
    <div className="avatar-preview">
      <div className="avatar-preview__halo" style={{ background: accent }} aria-hidden />
      <div className="avatar-preview__body">
        <div className="avatar-preview__face" />
        <div className="avatar-preview__eyes" />
        <div className="avatar-preview__mouth" />
      </div>
      <span className="avatar-preview__name">{name || 'Seu avatar'}</span>
    </div>
  );
};

export default AvatarPreview;
