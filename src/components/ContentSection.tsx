import ContentItem from './ContentItem'

interface ContentSectionProps {
    startIndex: number;
    titles: string[];
    descriptions: string[];
    topPosition: string;
  }
  
  const ContentSection: React.FC<ContentSectionProps> = ({ startIndex, titles, descriptions, topPosition }) => {
    const items = titles.map((title, index) => ({
        id: startIndex + index,
        title,
        description: descriptions[index]
    }));
    return (
        <div className="content-items-container" style={{ top: topPosition }}>
        {items.map((item) => (
            <ContentItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
            />
        ))}
        </div>
    );
  };

  export default ContentSection; 