import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId: string;
  apiKey: string;
}

export default function GoogleReviews({ placeId, apiKey }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if props are provided or if they are dummy values from .env template
    if (!placeId || !apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY" || placeId === "YOUR_GOOGLE_PLACE_ID") {
      setError("Waiting for Google Place ID and API Key to be configured in .env");
      setLoading(false);
      return;
    }

    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject('Failed to load script.'));
          return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load Google Maps script.');
        
        document.head.appendChild(script);
      });
    };

    const fetchReviews = async () => {
      try {
        await loadGoogleMapsScript();
        
        // We need a dummy div for the PlacesService, it won't be appended to the DOM
        const mapDiv = document.createElement('div');
        const service = new window.google.maps.places.PlacesService(mapDiv);
        
        service.getDetails(
          {
            placeId: placeId,
            fields: ['reviews']
          },
          (place: any, status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.reviews) {
              // Filter out reviews without text, and take top 5 (API max is 5 anyway)
              const validReviews = place.reviews
                .filter((r: GoogleReview) => r.text && r.text.length > 0)
                .slice(0, 5);
              setReviews(validReviews);
            } else if (status === window.google.maps.places.PlacesServiceStatus.NOT_FOUND) {
              setError("Place ID not found. Please check the ID.");
            } else {
              setError(`Failed to fetch reviews: ${status}`);
            }
            setLoading(false);
          }
        );
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Unknown error occurred.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId, apiKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="text-center mb-10">
          <div className="inline-block bg-primary/5 px-6 py-4 rounded-sm border border-primary/10">
             <p className="text-sm font-medium text-primary/60">{error}</p>
          </div>
        </div>
      )}

      {reviews.length === 0 && !error ? (
        <div className="text-center py-10 text-surface/50 italic">
          No reviews available at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {reviews.map((review, idx) => (
            <div key={idx} className={`bg-white p-8 shadow-sm border border-primary/5 rounded-sm relative text-left h-full flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-300 ${error ? 'opacity-60 grayscale' : ''}`}>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted/20 text-muted/20'}`} 
                  />
                ))}
              </div>
              
              <p className="font-display font-medium leading-relaxed mb-8 italic flex-grow text-primary/80">
                "{review.text.length > 250 ? review.text.substring(0, 250) + '...' : review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-primary/5">
                {review.profile_photo_url ? (
                  <img src={review.profile_photo_url} alt={review.author_name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold font-display text-primary">
                    {review.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-xs uppercase tracking-wide text-primary">{review.author_name}</p>
                  <p className="text-[10px] text-muted">{review.relative_time_description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
