import Image from "next/image";

const CustomImage = ({
  src,
  alt = "Image",
  className = "",
  fill = false,
  sizes = "100vw",
  width = 300,
  height = 300,
  priority = false,
  mode = "cover"
}) => {
  if (fill) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={80}
          priority={priority}
          className={`transition-opacity duration-500 ${
            mode === "cover" ? "object-cover" : "object-contain"
          }`}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={80}
      priority={priority}
      className={`transition-opacity duration-500 ${
        mode === "cover" ? "object-cover" : "object-contain"
      } ${className}`}
    />
  );
};

export default CustomImage;