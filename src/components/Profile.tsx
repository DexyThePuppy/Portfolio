import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTwitter, 
  faInstagram,
  faDiscord,
  faSteam
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDesktop,
  faVrCardboard,
  faPaw as SolidPaw,
  faUserGroup,
  faDog,
  faMarsDouble,
  faLocationDot,
  faCakeCandles,
  faVenusMars
} from '@fortawesome/free-solid-svg-icons';
import { 
  MapPinIcon, 
  UserIcon, 
  StarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  CubeIcon,
  FilmIcon,
  MusicalNoteIcon,
  PhotoIcon,
  HeartIcon as HeartIconSolid,
  HandRaisedIcon,
  FaceSmileIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';
import InfoCard from './InfoCard';
import IconText from './IconText';
import ImageItem from './ImageItem';
import ImagePreviewModal from './ImagePreviewModal';

interface UploadedImage {
  uuid: string;
  contentRating: string;
  width: number;
  height: number;
  blurHash: string;
}

interface ProfileImage {
  id: string;
  image: UploadedImage;
  accessPermission: string;
  isAd: boolean;
}

interface Place {
  place: string;
  region: string;
  country: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

interface ProfileLocation {
  type: string;
  homePlace: Place;
  place: Place;
}

interface SocialAccount {
  id: string;
  socialNetwork: string;
  isVerified: boolean;
  url: string;
  displayName: string;
  value: string;
  accessPermission: string;
}

interface Species {
  id: string;
  displayName: string;
}

interface Sona {
  id: string;
  displayName: string;
  hasFursuit: boolean;
  species: Species;
  images: ProfileImage[];
}

interface SocialPreference {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface JoinedGroup {
  id: string;
  name: string;
  icon: string;
}

interface ProfileProps {
  profile: {
    id: string;
    uuid: string;
    displayName: string;
    username: string;
    roles: string[];
    age: number;
    dateOfBirth: string;
    profileImage: ProfileImage;
    location: ProfileLocation;
    images: ProfileImage[];
    bio: {
      biography: string;
      genders: string[];
      languages: string[];
      relationshipStatus: string;
    };
    socialAccounts: SocialAccount[];
    sonas: Sona[];
    socialPreferences?: SocialPreference[];
    joinedGroups?: JoinedGroup[];
  };
}

// Register the global window properties for TypeScript
declare global {
  interface Window {
    forceImageReload?: number;
    bypassImageCache?: boolean;
  }
}

const Profile: React.FC<ProfileProps> = ({
  profile
}) => {
  const isVip = profile.roles.includes('supporter_vip');
  const publicSocialAccounts = profile.socialAccounts.filter(account => account.accessPermission === 'public');
  const publicImages = profile.images.filter(img => img.accessPermission === 'public' && !img.isAd);
  
  // Create an extended array of images for infinite scroll
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create an array that's 5 times longer than the original, with shuffled duplicates
  const createExtendedImages = () => {
    const multiplier = 5;
    const extended = [];
    for (let i = 0; i < multiplier; i++) {
      extended.push(...shuffleArray(publicImages));
    }
    return extended;
  };

  const [extendedImages, setExtendedImages] = useState(createExtendedImages());
  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(Math.floor(publicImages.length * 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPosition, setStartPosition] = useState<{ 
    x: number; 
    y: number; 
    width: number; 
    height: number;
    centerX?: number;
    centerY?: number;
  } | null>(null);
  const [showHighRes, setShowHighRes] = useState(false);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const thumbnailUrl = useRef<string>('');
  const isModalOpen = useRef(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [naturalDimensions, setNaturalDimensions] = useState<{width: number; height: number} | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [springAnimation, setSpringAnimation] = useState(false);
  const [imageCacheBuster, setImageCacheBuster] = useState<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const [galleryKey, setGalleryKey] = useState(0);

  // Keep track of already loaded images and their dimensions
  const loadedImages = useRef<{[key: string]: { src: string, width: number, height: number, isFullRes: boolean }}>({});
  
  // Track high-res loaded status
  const fullResLoadedImages = useRef<Set<string>>(new Set());

  // Main Info - Updated to match bio exactly
  const mainInfo = [
    { id: '1', title: 'Main', icon: UserIcon },
    { id: '2', title: '22 | Austria & Germany', icon: MapPinIcon },
    { id: '3', title: 'He/Him', icon: UserIcon },
    { id: '4', title: 'Australian Shep & Bernese Mountain Dog-dragon hybrid mix', icon: UserIcon },
    { id: '5', title: 'Gay Derg Doggo', icon: HeartIcon },
    { id: '6', title: 'Ambivert', icon: UserGroupIcon }
  ];

  // Stats - Updated to match bio exactly
  const statsInfo = [
    { 
      category: 'Physical',
      items: [
        { id: '1', title: 'Height 187cm/6.13feet', icon: UserIcon },
        { id: '2', title: 'Weight 99kg/218,3lbs', icon: HeartIcon }
      ]
    },
    {
      category: 'Traits',
      items: [
        { id: '1', title: 'Absolutely Adorable', icon: FaceSmileIcon },
        { id: '2', title: 'Cuddle Buddy', icon: HeartIconSolid }
      ]
    },
    {
      category: 'Personality',
      items: [
        { id: '1', title: 'Overwhelmed fast', icon: HandRaisedIcon },
        { id: '2', title: 'Emotionally Sensitive', icon: HeartIcon },
        { id: '3', title: 'Pretty shy', icon: FaceSmileIcon },
        { id: '4', title: 'Smol Spoon', icon: HeartIconSolid },
        { id: '5', title: 'Very jealous', icon: HeartIcon }
      ]
    }
  ];

  // Hobbies and Skills combined
  const hobbies = [
    { id: '1', title: 'Front-end Development', icon: CloudIcon },
    { id: '2', title: '3D Art', icon: CubeIcon },
    { id: '3', title: 'Content Creation', icon: FilmIcon },
    { id: '4', title: 'Music Production', icon: MusicalNoteIcon },
    { id: '5', title: 'Jailbreaking Devices', icon: WrenchScrewdriverIcon },
    { id: '6', title: 'Social Media', icon: PhotoIcon },
    { id: '7', title: 'PC/VR Gaming', icon: ComputerDesktopIcon }
  ];

  // Languages with flags
  const languages = [
    { id: '1', name: 'Austrian', flag: '🇦🇹' },
    { id: '2', name: 'German', flag: '🇩🇪' },
    { id: '3', name: 'American', flag: '🇺🇸' },
    { id: '4', name: 'Bosnian', flag: '🇧🇦' }
  ];

  // Tech Setup
  const techSetup = [
    { id: '1', title: 'Motherboard: MSI MAG X670R TOMAHAWK WIFI', icon: ComputerDesktopIcon },
    { id: '2', title: 'CPU: AMD Ryzen 9 7950X3D', icon: ComputerDesktopIcon },
    { id: '3', title: 'RAM: 2x Vengeance RGB DDR5 32GB', icon: ComputerDesktopIcon },
    { id: '4', title: 'GPU: NVIDIA GeForce RTX 4090', icon: ComputerDesktopIcon },
    { id: '5', title: 'AIO: Corsair iCUE Link H150i RGB', icon: ComputerDesktopIcon },
    { id: '6', title: 'Keyboard: Corsair K65 RGB MINI', icon: ComputerDesktopIcon },
    { id: '7', title: 'Mouse: Corsair Ironclaw RGB Wireless Slipstream', icon: ComputerDesktopIcon },
    { id: '8', title: 'VR: Quest 2, 4x Trackers & 2x Basestation', icon: DeviceTabletIcon },
    { id: '9', title: 'Laptop: Macbook M1 Pro 14', icon: ComputerDesktopIcon }
  ];

  // Platforms
  const platforms = [
    { id: '1', title: 'Resonite', icon: faVrCardboard },
    { id: '2', title: 'VRChat', icon: faVrCardboard },
    { id: '3', title: 'Second Life', icon: faDesktop }
  ];

  // Calculate the number of visible items based on screen width
  const getVisibleItems = (width: number) => {
    if (width <= 640) return 3;
    if (width <= 768) return 4;
    if (width <= 1024) return 5;
    if (width <= 1280) return 6;
    return 7;
  };

  // Calculate item width based on container width
  const calculateItemWidth = () => {
    if (!carouselContainerRef.current) return;
    const containerWidth = carouselContainerRef.current.clientWidth;
    const visibleItems = getVisibleItems(window.innerWidth);
    const gap = 8; // 0.5rem gap
    const totalGaps = visibleItems - 1;
    const availableWidth = containerWidth - (totalGaps * gap);
    const calculatedItemWidth = Math.floor(availableWidth / visibleItems);
    setItemWidth(calculatedItemWidth);
  };

  const visibleItems = getVisibleItems(window.innerWidth);

  useEffect(() => {
    calculateItemWidth();
    const handleResize = () => {
      calculateItemWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // If we're near the end, reset to the middle while maintaining visual position
    if (currentIndex >= extendedImages.length - visibleItems - 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(publicImages.length * 2));
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // If we're near the start, reset to the middle while maintaining visual position
    if (currentIndex <= 5) {
      const newImages = createExtendedImages();
      setExtendedImages(newImages);
      setCurrentIndex(Math.floor(publicImages.length * 2));
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  // Add state to track if banner is visible
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);
  
  // Improved parallax effect with IntersectionObserver and optimized animation
  useEffect(() => {
    // Skip everything if modal is open
    if (isModalOpen.current) return;
    
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;
    let currentY = lastScrollY;
    let targetY = lastScrollY;
    
    // More responsive parallax with variable smoothing
    const smoothFactor = 0.12; // Increased from 0.075 for smoother motion
    
    // Create intersection observer to detect when banner is in view
    const observer = new IntersectionObserver(
      (entries) => {
        // Update visibility state based on intersection
        setIsBannerVisible(entries[0].isIntersecting);
      },
      { 
        rootMargin: "100px 0px", // Add some margin to start/stop animation before element fully enters/exits
        threshold: 0.01 // Trigger with minimal visibility
      }
    );
    
    // Start observing banner
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    
    // Handle scroll events with throttling
    const handleScroll = () => {
      // Only update target position - animation loop will handle the rest
      targetY = window.scrollY;
    };
    
    // Set up optimized animation loop for smoother transitions
    const animate = () => {
      // If banner is not visible or modal is open, skip animation
      if (!isBannerVisible || isModalOpen.current) {
        // Still update currentY so that when it comes back into view, 
        // it doesn't jump from the old position
        currentY = targetY;
        rafId = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate distance to target
      const distance = targetY - currentY;
      const absDistance = Math.abs(distance);
      
      // Adaptive smoothing - faster for larger distances, smoother for small adjustments
      // This creates more responsive movement for quick scrolls while maintaining smoothness
      const adaptiveFactor = Math.min(
        smoothFactor * (1 + absDistance / 500),
        0.25
      );
      
      // Apply smooth movement if we're not exactly at target, with a threshold
      if (absDistance > 0.1) {
        currentY += distance * adaptiveFactor;
        // Update the state only when necessary
        setScrollY(currentY);
      }
      
      // Continue animation loop
      rafId = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    rafId = requestAnimationFrame(animate);
    
    // Register scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isBannerVisible]); // Only re-run if visibility changes

  useEffect(() => {
    if (selectedImage) {
      // Mark modal as open to prevent parallax scroll handling
      isModalOpen.current = true;
      
      // Just disable scrolling when modal is open, without affecting position
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
      
      // Re-enable parallax effect after a short delay
      setTimeout(() => {
        isModalOpen.current = false;
      }, 100);
    }
  }, [selectedImage]);

  const calculateExpandedDimensions = () => {
    if (!startPosition) return null;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 40; // Use fixed padding for consistent results
    
    const maxWidth = viewportWidth - (padding * 2);
    const maxHeight = viewportHeight - (padding * 2);
    
    // Use memoization or cache if available
    if (naturalDimensions?.width && naturalDimensions?.height) {
      const imageRatio = naturalDimensions.width / naturalDimensions.height;
      const fillFactor = 0.9; // Slightly increased fill factor
      
      let targetWidth, targetHeight;
      
      if (imageRatio > maxWidth / maxHeight) {
        targetWidth = maxWidth * fillFactor;
        targetHeight = targetWidth / imageRatio;
      } else {
        targetHeight = maxHeight * fillFactor;
        targetWidth = targetHeight * imageRatio;
      }
      
      const x = (viewportWidth - targetWidth) / 2;
      const y = (viewportHeight - targetHeight) / 2;
      
      return { width: targetWidth, height: targetHeight, x, y };
    }
    
    // Use default ratio if dimensions aren't available
    const aspectRatio = startPosition.width / startPosition.height;
    
    let targetWidth = maxWidth * 0.9;
    let targetHeight = targetWidth / aspectRatio;
    
    if (targetHeight > maxHeight) {
      targetHeight = maxHeight * 0.9;
      targetWidth = targetHeight * aspectRatio;
    }
    
    const x = (viewportWidth - targetWidth) / 2;
    const y = (viewportHeight - targetHeight) / 2;
    
    return { width: targetWidth, height: targetHeight, x, y };
  };

  // Preload gallery images on mount to have them in cache
  useEffect(() => {
    // Preload all gallery images at their intended sizes
    publicImages.forEach((photo, index) => {
      // Get size appropriate for this image
      const optimalSize = getGalleryImageSize(index);
      const url = getModifiedImageUrl(photo.image.uuid, optimalSize);
      
      // If we already have dimensions in the image data, use them immediately
      if (photo.image.width && photo.image.height) {
        // Store dimensions before loading to help with layout
        loadedImages.current[photo.image.uuid] = {
          src: url,
          width: photo.image.width,
          height: photo.image.height,
          isFullRes: false
        };
      }
      
      // Set up preload and tracking
      const img = new Image();
      img.onload = () => {
        // Save natural dimensions for later use
        loadedImages.current[photo.image.uuid] = {
          src: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          isFullRes: img.naturalWidth >= 1200 || optimalSize >= 1200 // Consider high-res if width >= 1200px
        };
        
        // If this is a high-res image, mark it as full res loaded
        if (img.naturalWidth >= 1200 || optimalSize >= 1200) {
          fullResLoadedImages.current.add(photo.image.uuid);
        }
        
        // Force update layout dimensions if containers exist
        const imageElement = imageRefs.current[`image-${index}`];
        if (imageElement) {
          const container = imageElement.querySelector('div');
          if (container) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            container.style.paddingBottom = `${Math.floor(100 / aspectRatio)}%`;
          }
        }
      };
      img.src = url;
    });
  }, [publicImages, imageCacheBuster]);

  // Modified handleImageClick to avoid reload and reuse loaded image
  const handleImageClick = (image: ProfileImage, index: number) => {
    // Get the element reference
    const imageElement = imageRefs.current[`image-${index}`];
    if (!imageElement) return;
    
    // Find the img element
    const imgElement = imageElement.querySelector('img');
    if (!imgElement) return;
    
    // Get precise measurements
    const rect = imgElement.getBoundingClientRect();
    
    // Check if high-res is already loaded
    const isElementMarkedAsLoaded = imageElement.classList.contains('thumbnail-loaded');
    const isFullResAlreadyLoaded = (isElementMarkedAsLoaded || 
      (fullResLoadedImages.current.has(image.image.uuid) && 
       loadedImages.current[image.image.uuid]?.isFullRes === true));
    
    // Get image source and dimensions
    const currentSrc = imgElement.currentSrc || imgElement.src;
    
    // Set dimensions immediately using cached values if available
    const cachedImg = loadedImages.current[image.image.uuid];
    if (cachedImg?.width && cachedImg?.height) {
      setNaturalDimensions({
        width: cachedImg.width,
        height: cachedImg.height
      });
    } else {
      // Fallback to viewport-based dimensions
      const viewportWidth = window.innerWidth * 0.8;
      const viewportHeight = window.innerHeight * 0.8;
      const aspectRatio = rect.width / rect.height;
      
      const estimatedWidth = aspectRatio > 1 
        ? Math.min(viewportWidth, viewportHeight * aspectRatio)
        : viewportHeight * aspectRatio;
      const estimatedHeight = estimatedWidth / aspectRatio;
      
      setNaturalDimensions({
        width: estimatedWidth,
        height: estimatedHeight
      });
    }
    
    // Simplify loading logic
    setImageLoaded(isFullResAlreadyLoaded);
    setLoadingProgress(isFullResAlreadyLoaded ? 100 : 5);
    setShowLoadingBar(!isFullResAlreadyLoaded);
    setSpringAnimation(false);
    
    // Clean up any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // Set thumbnail URL
    thumbnailUrl.current = currentSrc;
    
    // Store position precisely
    setStartPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + (rect.width / 2),
      centerY: rect.top + (rect.height / 2)
    });
    
    // Set selected image
    setSelectedImage(image);
    setShowHighRes(isFullResAlreadyLoaded);
    
    // Use requestAnimationFrame for smoother animation startup
    requestAnimationFrame(() => {
      setIsAnimating(true);
      
      // If high-res is already loaded, trigger spring animation after a frame
      if (isFullResAlreadyLoaded) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setSpringAnimation(true);
          }, 100);
        });
        return;
      }
      
      // Load high-res image
      const highResUrl = getModifiedImageUrl(image.image.uuid, 1500);
      const highResImage = new Image();
      
      highResImage.onload = () => {
        // Update cache and dimensions
        loadedImages.current[image.image.uuid] = {
          src: highResImage.src,
          width: highResImage.naturalWidth,
          height: highResImage.naturalHeight,
          isFullRes: true
        };
        
        fullResLoadedImages.current.add(image.image.uuid);
        
        // Update UI state
        setNaturalDimensions({
          width: highResImage.naturalWidth,
          height: highResImage.naturalHeight
        });
        
        setLoadingProgress(100);
        setImageLoaded(true);
        setShowHighRes(true);
        
        // Trigger spring animation
        requestAnimationFrame(() => {
          setSpringAnimation(true);
        });
        
        // Hide loading bar
        setTimeout(() => {
          setShowLoadingBar(false);
        }, 400);
      };
      
      highResImage.src = highResUrl;
    });
  };

  // When high-res image is loaded
  const handleHighResImageLoad = () => {
    setImageLoaded(true);
    
    // Trigger spring animation after a short delay
    setTimeout(() => {
      setSpringAnimation(true);
    }, 50);
  };

  const handleClosePreview = (e?: React.MouseEvent) => {
    // Prevent click event from propagating if it's from the close button
    if (e) {
      e.stopPropagation();
    }
    
    // Clear any running interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // First hide loading elements immediately - including children elements
    setShowLoadingBar(false);
    
    // Use a specific "closing" animation class
    setIsAnimating(false);
    setShowHighRes(false);
    setImageLoaded(false);
    setSpringAnimation(false);
    
    // Use a shorter timeout to match faster animation
    setTimeout(() => {
      setSelectedImage(null);
      setStartPosition(null);
      setNaturalDimensions(null);
      setLoadingProgress(0);
    }, 250); // Reduced from 400ms to 250ms for faster closing
  };

  // Function to clear cache for debugging
  const clearCache = () => {
    // Clear all image-related state
    setExtendedImages(createExtendedImages());
    setSelectedImage(null);
    setCurrentIndex(Math.floor(publicImages.length * 2));
    setIsAnimating(false);
    setStartPosition(null);
    setShowHighRes(false);
    setNaturalDimensions(null);
    setImageLoaded(false);
    
    // Clear URL cache
    thumbnailUrl.current = '';
    
    // Reset image refs
    imageRefs.current = {};
    
    // Clear loaded images tracking
    loadedImages.current = {};
    fullResLoadedImages.current.clear();
    
    // Clear "loaded" class from all thumbnails
    document.querySelectorAll('.thumbnail-loaded').forEach(element => {
      element.classList.remove('thumbnail-loaded');
    });
    
    // Force re-render carousel
    calculateItemWidth();
    
    // More aggressive cache clearing approach
    try {
      // Clear browser cache for images
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      }
      
      // Add timestamp query parameter to image URLs to bypass cache
      const timestamp = Date.now();
      
      // Force refresh of all images by updating the cache buster timestamp
      setImageCacheBuster(timestamp);
      
      // Force re-mount of the gallery by changing its key
      setGalleryKey(prevKey => prevKey + 1);
      
      // Try to invalidate browser cache for specific images
      const urls = publicImages.map(img => getModifiedImageUrl(img.image.uuid));
      // Add profile image
      urls.push(getModifiedImageUrl(profile.profileImage.image.uuid));
      
      // Try to evict these URLs from memory cache
      urls.forEach(url => {
        // Create a dummy fetch to invalidate the cache
        fetch(url, { cache: 'reload', mode: 'no-cors' }).catch(() => {
          // Ignore errors - this is just an attempt to refresh the cache
        });
      });
      
      // Log for debugging
      console.log('Cache cleared, forcing image reload', timestamp);
      
      // Alert user
      alert('Cache cleared successfully. Images should refresh.');
    } catch (err) {
      console.error('Error clearing cache:', err);
      alert('Error clearing cache. Try refreshing the page.');
    }
  };

  // Calculate optimal image dimensions based on viewport and container
  const calculateOptimalImageSize = (containerWidth: number, devicePixelRatio = window.devicePixelRatio || 1): number => {
    // Round to nearest 50px increment for better CDN caching
    const size = Math.round((containerWidth * devicePixelRatio) / 50) * 50;
    // Set bounds (200px-800px) to prevent too small or too large requests
    return Math.max(200, Math.min(800, size));
  };

  // Improved getModifiedImageUrl to handle responsive sizes
  const getModifiedImageUrl = (uuid: string, width?: number): string => {
    // If specific width is provided, use that (for high-res preview)
    // Otherwise calculate optimal size based on container
    const containerWidth = carouselContainerRef.current?.clientWidth || 1200;
    const columns = getVisibleItems(window.innerWidth);
    
    // Calculate optimal size if width not specified
    const calculatedWidth = width || calculateOptimalImageSize(
      // For gallery items, divide container by number of columns
      // Add 20% for hover scaling effect
      Math.ceil(containerWidth / columns * 1.2)
    );
    
    // Build URL with calculated or specified width
    const baseUrl = `https://assets.barq.app/image/${uuid}.jpeg?width=${calculatedWidth}`;
    
    // Add cache busting parameter if necessary
    if (imageCacheBuster) {
      return `${baseUrl}&t=${imageCacheBuster}`;
    }
    return baseUrl;
  };
  
  // Function to clear cookies for debugging
  const clearCookies = () => {
    try {
      // Get all cookies
      const cookies = document.cookie.split(";");
      
      // Delete each cookie
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      
      // Also try to clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      
      // Log for debugging
      console.log('Cookies and storage cleared', new Date().toISOString());
      
      // Alert user
      alert('Cookies and local storage cleared successfully');
    } catch (err) {
      // Type assertion to handle the unknown error type
      const error = err as Error;
      console.error('Error clearing cookies:', error);
      alert('Error clearing cookies: ' + (error.message || 'Unknown error'));
    }
  };

  // Track container sizes for responsive image loading
  const [containerSizes, setContainerSizes] = useState({
    gallery: 0,
    carousel: 0
  });

  // Update container sizes on window resize
  useEffect(() => {
    const updateContainerSizes = () => {
      // Get gallery container size
      const galleryContainer = document.querySelector('.gallery-grid');
      const galleryItemWidth = galleryContainer ? 
        galleryContainer.clientWidth / getVisibleItems(window.innerWidth) : 0;
      
      setContainerSizes({
        gallery: galleryItemWidth,
        carousel: carouselContainerRef.current?.clientWidth || 0
      });
    };
    
    // Initial calculation
    updateContainerSizes();
    
    // Update on resize
    window.addEventListener('resize', updateContainerSizes);
    return () => window.removeEventListener('resize', updateContainerSizes);
  }, []);

  // Function to get optimal image size for gallery items
  const getGalleryImageSize = (_index: number): number => {
    // Use container size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const columns = getVisibleItems(window.innerWidth);
    const baseSize = containerSizes.gallery || (window.innerWidth / columns);
    
    // Round to nearest 50px and apply bounds
    return calculateOptimalImageSize(baseSize, dpr);
  };

  // When high-res image is loaded, add "loaded" class to the thumbnail
  useEffect(() => {
    // Apply "loaded" class to thumbnails of images that have full-res versions loaded
    const applyLoadedClass = () => {
      // Find all thumbnails and check if they have full-res versions loaded
      fullResLoadedImages.current.forEach(uuid => {
        // Find gallery items with this uuid
        document.querySelectorAll(`img[src*="${uuid}"]`).forEach(element => {
          // Add a class to the parent element to mark it as loaded
          const parentElement = element.closest('div');
          if (parentElement) {
            parentElement.classList.add('thumbnail-loaded');
          }
        });
      });
    };
    
    // Apply loaded class when the component mounts and whenever the fullResLoadedImages set changes
    applyLoadedClass();
    
    // Listen for cache updates and update classes
    const updateInterval = setInterval(applyLoadedClass, 5000);
    
    return () => {
      clearInterval(updateInterval);
    };
  }, [galleryKey, imageCacheBuster]); // Re-run when gallery is refreshed or cache is busted

  return (
    <div className="min-h-screen bg-secondary text-white">
      {/* Banner Image - Fixed at top with parallax effect */}
      <div 
        className="fixed top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden"
        ref={bannerRef}
      >
        <div
          style={{
            backgroundImage: `url('/img/banner.JPEG')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            height: 'calc(100% + 100px)',
            width: '100%',
            transform: isBannerVisible ? 
              `translate3d(0, ${-50 + scrollY * -0.2}px, 0)` : 
              'translate3d(0, -50px, 0)',
            willChange: isBannerVisible ? 'transform' : 'auto',
            transition: 'transform 0.08s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        ></div>
      </div>
      
      {/* Gradient Overlay - Fixed with banner */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-transparent to-secondary z-0 opacity-80"></div>
      
      {/* Scrollable Content Area */}
      <div className="relative z-10">
        {/* Empty space to push content below the banner */}
        <div className="h-[30vh]"></div>
        
        {/* Main Content with dark background */}
        <div className="bg-secondary min-h-[60vh] rounded-t-3xl shadow-lg pt-4">
          <div className="container mx-auto px-4">
            {/* Profile Header */}
            <div className="mb-12">
              <div className="flex flex-row items-center gap-6 mb-6">
                <div className="relative -mt-24 sm:-mt-24 lg:-mt-50">
                  <img
                    src={getModifiedImageUrl(profile.profileImage.image.uuid)}
                    alt={profile.displayName}
                    className="w-32 h-32 sm:w-50 sm:h-50 lg:w-50 lg:h-50 rounded-3xl lg:rounded-3xl object-cover border-4 border-[rgb(255,138,128)] shadow-xl"
                  />
                  {isVip && (
                    <div className="absolute -top-2 -right-2 bg-[rgb(255,138,128)] text-white p-1 rounded-full">
                      <StarIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 pb-2 text-left sm:text-left">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-4 mt-2 sm:mt-2 text-white">{profile.displayName}</h1>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 text-gray-200 w-full mb-2">
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>{profile.location.place.place}, {profile.location.place.country}</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faCakeCandles} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>{profile.age} years old</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faVenusMars} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>He/Him</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faMarsDouble} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>Gay</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faDog} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>Doggo</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>Ambivert</span>
                </div>
                <div className="flex items-center justify-start gap-2 bg-gray-800/50 rounded-full px-3 py-1.5">
                  <FontAwesomeIcon icon={SolidPaw} className="w-4 h-4 text-[rgb(255,138,128)]" />
                  <span>Furry & Puppy</span>
                </div>
              </div>
            </div>

      {/* Image Carousel */}
            <div className="carousel-container relative z-20" ref={carouselContainerRef}>
          <button 
            onClick={handlePrev}
                className="carousel-button prev z-30"
            disabled={isAnimating}
            aria-label="Previous image"
                style={{ left: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            className="carousel-track"
            style={{ 
              transform: `translateX(-${currentIndex * (itemWidth + 8)}px)`,
              width: 'max-content',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              display: 'flex',
              transition: 'transform 0.3s ease-in-out'
            }}
          >
                {extendedImages.map((image, index) => {
                  // Check if full-res is loaded for this image
                  const isLoaded = fullResLoadedImages.current.has(image.image.uuid);
                  
                  return (
              <ImageItem
                key={`${image.id}-${index}`}
                      image={image}
                      index={index}
                      variant="carousel"
                      itemWidth={itemWidth}
                      isLoaded={isLoaded}
                      isAnimating={isAnimating}
                      onClick={() => !isAnimating && handleImageClick(image, index)}
                      ref={el => imageRefs.current[`image-${index}`] = el}
                      getModifiedImageUrl={getModifiedImageUrl}
                      profileName={profile.displayName}
                />
                  );
                })}
          </div>
          <button 
            onClick={handleNext}
                className="carousel-button next z-30"
            disabled={isAnimating}
            aria-label="Next image"
                style={{ right: 0, position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </div>

      {/* Main Content */}
            <div className="mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            {/* About Section */}
            <InfoCard title="About">
              {mainInfo.map((info) => (
                <IconText key={info.id} icon={info.icon} text={info.title} />
              ))}
            </InfoCard>

            {/* Stats Section */}
            <InfoCard title="Stats">
              {statsInfo.map((section) => (
                <div key={section.category}>
                  <h3 className="text-sm font-semibold icon-accent mb-2">{section.category}</h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <IconText key={item.id} icon={item.icon} text={item.title} />
                    ))}
                  </div>
                </div>
              ))}
            </InfoCard>

            {/* Hobbies Section */}
            <InfoCard title="Hobbies & Skills">
              {hobbies.map((hobby) => (
                <IconText key={hobby.id} icon={hobby.icon} text={hobby.title} />
              ))}
            </InfoCard>

            {/* Languages Section */}
            <InfoCard title="Languages">
              {languages.map((language) => (
                <IconText key={language.id} icon={() => <span className="text-xl">{language.flag}</span>} text={language.name} />
              ))}
            </InfoCard>

            {/* Tech Setup */}
            <InfoCard title="Tech Setup">
              {techSetup.map((item) => (
                <IconText key={item.id} icon={item.icon} text={item.title} />
              ))}
            </InfoCard>

            {/* Platforms */}
            <InfoCard title="Platforms">
              {platforms.map((platform) => (
                <IconText key={platform.id} icon={() => <FontAwesomeIcon icon={platform.icon} className="icon-small icon-accent" />} text={platform.title} />
              ))}
            </InfoCard>

            {/* Social Links */}
            <InfoCard title="Social Links">
              {publicSocialAccounts.map((account) => (
                <IconText key={account.id} icon={() => {
                  switch (account.socialNetwork.toLowerCase()) {
                    case 'twitter':
                      return <FontAwesomeIcon icon={faTwitter} className="icon-small" />;
                    case 'instagram':
                      return <FontAwesomeIcon icon={faInstagram} className="icon-small" />;
                    case 'discord':
                      return <FontAwesomeIcon icon={faDiscord} className="icon-small" />;
                    case 'steam':
                      return <FontAwesomeIcon icon={faSteam} className="icon-small" />;
                    default:
                      return <GlobeAltIcon className="icon-small" />;
                  }
                }} text={account.displayName} />
              ))}
            </InfoCard>
          </div>

          {/* Right Column - Photo Grid */}
          <div className="lg:col-span-9">
              <div key={galleryKey} className="columns-3 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-5 gap-2.5 lg:gap-2.5 gallery-grid">
                    {publicImages.map((photo, index) => {
                      // Calculate optimal image size for this grid item
                      const optimalSize = getGalleryImageSize(index);
                      
                      // Check if full-res is loaded for this image
                      const isLoaded = fullResLoadedImages.current.has(photo.image.uuid);
                      
                      // Calculate a minimum height based on image dimensions in the data if available
                      // This helps prevent layout shifts while loading
                      const getMinHeight = () => {
                        // If we have cached dimensions, use those for ratio calculation
                        const cachedImg = loadedImages.current[photo.image.uuid];
                        if (cachedImg && cachedImg.width && cachedImg.height) {
                          const aspectRatio = cachedImg.width / cachedImg.height;
                          return `${Math.floor(100 / aspectRatio)}%`;
                        }

                        // If we have dimensions in the original data
                        if (photo.image.width && photo.image.height) {
                          const aspectRatio = photo.image.width / photo.image.height;
                          return `${Math.floor(100 / aspectRatio)}%`;
                        }
                        
                        // Default fallback for unknown dimensions (1:1 ratio as fallback)
                        return '100%';
                      };
                      
                      return (
                <ImageItem
                          key={photo.id + (imageCacheBuster?.toString() || '')}
                  image={photo}
                  index={index}
                  variant="gallery"
                  isLoaded={isLoaded}
                  cacheBuster={imageCacheBuster?.toString() || null}
                  ref={el => imageRefs.current[`image-${index}`] = el}
                  onClick={() => handleImageClick(photo, index)}
                  getModifiedImageUrl={getModifiedImageUrl}
                  getMinHeight={getMinHeight}
                  optimalSize={optimalSize}
                  onImageLoad={handleHighResImageLoad}
                />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && startPosition && (
        <ImagePreviewModal
          selectedImage={selectedImage}
          startPosition={startPosition}
          isAnimating={isAnimating}
          imageLoaded={imageLoaded}
          showLoadingBar={showLoadingBar}
          loadingProgress={loadingProgress}
          springAnimation={springAnimation}
          showHighRes={showHighRes}
          thumbnailUrl={thumbnailUrl.current}
          calculateExpandedDimensions={calculateExpandedDimensions}
          onClose={handleClosePreview}
          getModifiedImageUrl={getModifiedImageUrl}
          onHighResImageLoad={handleHighResImageLoad}
        />
      )}

      {/* Debug buttons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={clearCache}
          className="bg-black/30 hover:bg-black/50 text-white/70 hover:text-white text-xs py-2 px-3 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 flex items-center gap-1"
          title="Clear cache (debug)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Clear Cache
        </button>
        
        <button
          onClick={clearCookies}
          className="bg-black/30 hover:bg-black/50 text-white/70 hover:text-white text-xs py-2 px-3 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 flex items-center gap-1"
          title="Clear cookies & storage (debug)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm-4.5 7a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-9z" />
          </svg>
          Clear Cookies
        </button>
      </div>
    </div>
  );
};

export default Profile; 