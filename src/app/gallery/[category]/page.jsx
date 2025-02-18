"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import CustomImage from "@/component/image/customImage";
import LoadingSpinner from "@/component/loading/loading";

const PhotoModal = dynamic(() => import("@/component/modal/photoModal"), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const CategoryFilter = dynamic(() => import("../component/categoryFilter"), {
  ssr: false
});

const GUEST_LIMIT = 24;

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
  const ITEMS_PER_PAGE = 8;

  const { category } = useParams();

  const observer = useRef();
  const lastPhotoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    if (!session && photos.length >= GUEST_LIMIT) return;
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, session, photos.length]);

  const fetchPhotos = useCallback(async () => {
    try {
      if (!session && photos.length >= GUEST_LIMIT) {
        setHasMore(false);
        return;
      }

      setLoading(true);
      const response = await fetch(
        `/api/test-db?category=${category}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();

      if (data.success) {
        if (page === 1) {
          const limitedPhotos = !session && data.photos.length > GUEST_LIMIT 
            ? data.photos.slice(0, GUEST_LIMIT) 
            : data.photos;
          setPhotos(limitedPhotos || []);
        } else {
          setPhotos(prev => {
            const combinedPhotos = [...prev, ...(data.photos || [])];
            if (!session && combinedPhotos.length > GUEST_LIMIT) {
              return combinedPhotos.slice(0, GUEST_LIMIT);
            }
            return combinedPhotos;
          });
        }
        setCategories(data.categories || []);
        setHasMore(data.hasMore && (session || photos.length < GUEST_LIMIT));
      } else {
        throw new Error(data.error || "Failed to fetch photos");
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, page, session, photos.length]);

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    fetchPhotos();
  }, [category]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos();
    }
  }, [page, fetchPhotos]);

  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col w-[90%] mx-auto mt-4 relative overflow-hidden">
      <h4 className="text-4xl font-bold text-center mb-4 capitalize text-gray-500">
        Explore
      </h4>

      <CategoryFilter categories={categories} activeCategory={category} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={`${photo._id}-${index}`}
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
                mode="contain"
              />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner text="Loading more photos..." />
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No photos available in this category.
        </div>
      )}

      {!session && photos.length >= GUEST_LIMIT && (
        <div className="relative mt-12">
          <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-transparent to-black/90" />
          
          <div className="relative z-10 flex flex-col items-center py-12 backdrop-blur-lg bg-black/30">
            <div className="max-w-md text-center px-4">
              <h3 className="text-2xl font-bold text-white mb-3">
                Want to See More?
              </h3>
              <p className="text-gray-200 text-lg mb-6">
                Sign in to explore our complete collection of stunning photographs
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