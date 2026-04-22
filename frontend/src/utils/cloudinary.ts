export type CloudinaryImageType = 'hero' | 'section' | 'card';

/**
 * Constructs a Cloudinary URL explicitly mapped to the CEP root directory.
 * Path format: [public_id]
 * Filename can be the strict public ID (e.g. Govigyan-water-1x1_cwbvcm)
 */
export const getImage = (
  filename: string,
  type: CloudinaryImageType = 'section'
): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dyormiiop';
  
  // Map our type to explicit width transformations, enforcing q_auto and f_auto
  let format = 'w_1000';
  if (type === 'hero') format = 'w_1600';
  if (type === 'card') format = 'w_600';
  
  const transformations = `${format},q_auto,f_auto`;
  
  // Strip out any file extensions if accidentally passed, as Cloudinary public IDs often omit them
  const publicId = filename.replace(/\.[^/.]+$/, "");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};
