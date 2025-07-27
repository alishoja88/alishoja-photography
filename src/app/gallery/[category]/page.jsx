"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CustomImage from "@/components/ui/image/customImage";
import LoadingSpinner from "@/components/ui/loading/loading";
import { siteConfig } from "@/app/config/siteConfig";

const PhotoModal = dynamic(() => import("@/components/ui/modal/photoModal"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const CategoryFilter = dynamic(() => import("@/components/gallery/component/categoryFilter"), {
  ssr: false,
});

const ITEMS_PER_PAGE = 12;

function CategoryGallery() {
  const { data: session } = useSession();
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  
  const shouldLimitGuest = !session && siteConfig.enableGuestLimit;
  const GUEST_LIMIT = siteConfig.guestPhotoLimit;

  const { category } = useParams();

  const observer = useRef();
  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (shouldLimitGuest && photos.length >= GUEST_LIMIT) return;
      if (!hasMore) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, shouldLimitGuest, photos.length]
  );

 
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

 
  const lastPageRef = useRef(0);

  const fetchPhotos = useCallback(async () => {
    if (page <= lastPageRef.current && page > 1) return;
    if (shouldLimitGuest && photos.length >= GUEST_LIMIT) {
      setHasMore(false);
      return;
    }

    try {
      setLoading(true);
      console.log(`Fetching page ${page} for category ${category}`);
      
      const response = await fetch(
        `/api/test-db?category=${category}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.success) {
        lastPageRef.current = page;
        const currentPhotos = photosRef.current;
        if (page === 1) {
          const newPhotos = shouldLimitGuest && data.photos.length > GUEST_LIMIT 
            ? data.photos.slice(0, GUEST_LIMIT) 
            : data.photos;
          setPhotos(newPhotos || []);
        } else {
          const existingIds = new Set(currentPhotos.map(photo => photo._id));
          const uniqueNewPhotos = data.photos.filter(photo => !existingIds.has(photo._id));
          
          if (uniqueNewPhotos.length === 0) {
            setHasMore(false);
            console.log('No new photos found, reached end of category');
          } else { 
            setPhotos(prev => {
              const combined = [...prev, ...uniqueNewPhotos];
              if (shouldLimitGuest && combined.length > GUEST_LIMIT) {
                return combined.slice(0, GUEST_LIMIT);
              }
              return combined;
            });
          }
        }
        
        setCategories(data.categories || []);
        
        const reachedEnd = data.photos.length < ITEMS_PER_PAGE || !data.hasMore;
        const reachedGuestLimit = shouldLimitGuest && (photos.length + data.photos.length) >= GUEST_LIMIT;
        
        if (reachedEnd || reachedGuestLimit) {
          setHasMore(false);
          console.log('Setting hasMore to false because:', 
                     reachedEnd ? 'Reached end of photos' : 'Reached guest limit');
        }
      } else {
        throw new Error(data.error || "Failed to fetch photos");
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, page, shouldLimitGuest]);

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    setHasMore(true);
    lastPageRef.current = 0; 
    
    console.log(`Category changed to: ${category}, resetting data`);
  }, [category]); 

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos, page, category]);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log(`Current state - Photos: ${photos.length}, Page: ${page}, HasMore: ${hasMore}`);
  }, [photos.length, page, hasMore]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col w-[90%] mx-auto mt-4 relative overflow-hidden">
      <h4 className="text-4xl font-bold text-center mb-4 capitalize text-gray-500">
        {category || "Explore"}
      </h4>

      <CategoryFilter categories={categories} activeCategory={category} />

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo._id}
              ref={index === photos.length - 1 ? lastPhotoElementRef : null}
              onClick={() => openModal(index)}
              className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-[#333435]">
                <CustomImage
                  src={photo.src}
                  alt={photo.alt || "Photo"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  className="w-full h-full"
                  mode="cover"
                />
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center text-gray-500 mt-12 p-8 bg-gray-100 rounded-lg">
          No photos available in this category.
        </div>
      ) : null}

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner text="Loading photos..." />
        </div>
      )}

      {shouldLimitGuest && photos.length >= GUEST_LIMIT && (
        <div className="relative mt-12">
          <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-transparent to-black/90" />

          <div className="relative z-10 flex flex-col items-center py-12 backdrop-blur-lg bg-black/30">
            <div className="max-w-md text-center px-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                Want to See More?
              </h3>
              <p className="text-gray-200 text-lg mb-6">
                Sign in to explore our complete collection of stunning
                photographs
              </p>
              <Link
                href="/login"
                className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg
                          hover:bg-purple-700 transform hover:scale-105
                          transition-all duration-300 shadow-lg
                          hover:shadow-purple-500/50"
              >
                Sign In to Continue
              </Link>
            </div>
          </div>
        </div>
      )}

      {!loading && photos.length > 0 && !hasMore && !shouldLimitGuest && (
        <div className="text-center text-gray-500 mt-8 mb-4 p-4">
          You've reached the end of this category.
        </div>
      )}

      {isModalOpen && (
        <PhotoModal
          photos={photos}
          activeIndex={activeIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default CategoryGallery;