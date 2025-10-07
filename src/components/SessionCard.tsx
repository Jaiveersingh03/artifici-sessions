interface SessionCardProps {
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}

const SessionCard = ({ title, description, onClick, delay = 0 }: SessionCardProps) => {
  return (
    <div
      onClick={onClick}
      className="card-3d bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg cursor-pointer border border-gray-200 opacity-0 card-enter"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SessionCard;
