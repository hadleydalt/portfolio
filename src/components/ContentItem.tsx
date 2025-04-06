interface ContentItemProps {
  id: number;
  title: string;
  description: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ id, title, description }) => {
  return (
    <div className="content-item">
      <div className="content-item-id">{id.toString().padStart(2, '0')}</div>
      <div className="content-item-text">
        <div className="content-item-title">{title}</div>
        <div className="content-item-description">{description}</div>
      </div>
    </div>
  );
};

export default ContentItem; 