import * as React from 'react';

type SessionProps = {
    displayName: string | null;
    pictureUrl?: string | null;
};
type TextProps = {
    text: string;
};
type ProfileAvatarProps = (SessionProps | TextProps) & {
    className?: string;
    fallbackClassName?: string;
};
declare function ProfileAvatar(props: ProfileAvatarProps): React.JSX.Element;

export { ProfileAvatar };
