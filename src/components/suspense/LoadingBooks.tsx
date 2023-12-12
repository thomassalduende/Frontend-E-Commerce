

const LoadingCard: React.FC = () => {
    return (
        <div className="p-4 mb-4 bg-gray-200 rounded animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-3"></div>
            <div className="h-3 bg-gray-300 rounded mb-3"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
    );
};

export default LoadingCard;
