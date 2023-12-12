import LoadingCard from './LoadingBooks';

export const LoadingCardsList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(10)].map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    );
};


