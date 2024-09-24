import axios from 'axios';

// Image upload function
export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await axios.post<{ data: { display_url: string } }>(
    'https://api.imgbb.com/1/upload?key=19c9072b07556f7849d6dea75b7e834d',
    formData
  );

  return data.data.display_url;
};
