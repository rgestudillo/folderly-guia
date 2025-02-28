import axios from 'axios';

// Function to get Street View images based on location
export async function getLocationImages(latitude: number, longitude: number): Promise<string[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('GOOGLE_MAPS_API_KEY not found in environment variables');
      return getFallbackImages().slice(0, 4);
    }
    
    // Base parameters for the Street View images
    const size = '600x300'; // Adjust as needed (width x height)
    const fov = 80;        // Field of view (default is 80)
    const pitch = 0;       // Camera pitch
    
    // To capture a 360-degree view, vary the heading (0, 90, 180, 270 degrees)
    const headings = [0, 90, 180, 270];
    
    // Generate the Street View image URLs for each heading
    const imageUrls = headings.map(heading => 
      `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${latitude},${longitude}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${apiKey}`
    );
    
    // Optionally validate each image URL with a HEAD request
    const validatedUrls: string[] = [];
    for (const url of imageUrls) {
      try {
        const response = await axios.head(url);
        if (response.status === 200) {
          validatedUrls.push(url);
        }
      } catch (error) {
        console.warn('Invalid or inaccessible image URL, skipping...', error);
      }
    }
    
    // If not all images validated, fill missing ones with fallback images
    if (validatedUrls.length < 4) {
      const fallback = getFallbackImages();
      for (let i = validatedUrls.length; i < 4; i++) {
        validatedUrls.push(fallback[i]);
      }
    }
    
    return validatedUrls;
  } catch (error) {
    console.error('Error fetching Street View images:', error);
    return getFallbackImages().slice(0, 4);
  }
}

// Fallback images in case the API call fails or validation doesn't return enough images
function getFallbackImages(): string[] {
  return [
    'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80',
    'https://images.unsplash.com/photo-1552083375-1447ce886485?w=1200&q=80',
    'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1200&q=80',
    'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=1200&q=80'
  ];
}
