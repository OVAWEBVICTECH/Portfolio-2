export interface Destination {
  id: string;
  name: string;
  country: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewsCount: number;
  discountText: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  isUserSubmitted?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  author: string;
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'tour' | 'car';
  title: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  status: 'confirmed' | 'pending';
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  classType?: string;
  extraOptions?: string[];
  bookingDate: string;
}
