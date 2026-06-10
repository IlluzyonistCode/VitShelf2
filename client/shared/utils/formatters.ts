export const ratingToStars = (rating: number): string =>
    '★'.repeat(rating) + '☆'.repeat(5 - rating);
export const statusColor: Record < string, string > = {
    read: '#4caf50',
    reading: '#ff9800',
    wishlist: '#2196f3'
};
