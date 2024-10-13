type AvatarProps = {
  name?: string
}

export const getAvatar = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}`;
};

const Avatar = ({name}: AvatarProps) => {

  if (!name) {
    return <span className="avatar">?</span>
  }

  return (
    <img src={getAvatar(name)} alt={`Avatar for ${name}`} className="avatar" />
  );
}

export default Avatar;
