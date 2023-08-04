import axios, { AxiosResponse } from "axios";

// 현재 날짜를 문자열로 반환하는 함수
// 예) "2023-05-06" 형태의 문자열을 반환합니다.
export const getToday: () => string = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;

  return dateString;
};

export const checkValidAddress = async (address: string) => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  try {
    const checkResult = await new Promise<any>((resolve, reject) => {
      geocoder.addressSearch(address, (result: any, status: string) => {
        resolve({ result, status });
      });
    });

    const { result, status } = checkResult;

    if (status !== "OK") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Geocoder error:", error);
    return false;
  }
};

export const checkServer = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACK}`);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPhoneForm = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");

  const formattedNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  return formattedNumber;
};

export const isRegionIncluded = (address: string) => {
  const locations = ["서울", "강원", "충청", "경상", "전라", "제주"];

  let included = locations.reduce((result, location) => {
    return (result = result || address.includes(location));
  }, false);

  return included;
};

export const getImageUrl = async (imageName: string, image: File) => {
  imageName = encodeURIComponent(imageName);

  const imageUploadResponse: AxiosResponse<any, any> = await axios.get(
    `http://localhost:4000/image?file=${imageName}`
  );

  const formData = new FormData();
  Object.entries({
    ...imageUploadResponse.data.fields,
    file: image,
  }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  let uploadResult = await fetch(imageUploadResponse.data.url, {
    method: "POST",
    body: formData,
  });

  if (uploadResult.ok) {
    return `${uploadResult.url}/${imageName}`;
  } else {
    return null;
  }
};
