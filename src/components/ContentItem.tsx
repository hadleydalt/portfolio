import { useState, useRef, useEffect } from 'react';
import AnimatedArrow from '../assets/Animated_Arrow.mov';

interface ContentItemProps {
  id: number;
  title: string;
  description: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ id, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing video:", error);
        });
      }
    }
  }, [isHovered]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    console.log("Mouse entered", { 
      target: e.target, 
      currentTarget: e.currentTarget,
      clientX: e.clientX,
      clientY: e.clientY
    });
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    console.log("Mouse left", {
      target: e.target,
      currentTarget: e.currentTarget,
      clientX: e.clientX,
      clientY: e.clientY
    });
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="content-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => console.log("Clicked content item")}
    >
      <div className="content-item-id">{id.toString().padStart(2, '0')}</div>
      <div className="content-item-text">
        <div className="content-item-title">
          {title}
          <video
            ref={videoRef}
            className="content-item-video-overlay"
            src={AnimatedArrow}
            muted
            playsInline
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
        <div className="content-item-description">{description}</div>
      </div>
    </div>
  );
};

export default ContentItem; 