import axios from "axios";

export let isLocal = false;
export const localAreaImagePath =
  "https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518_1280.jpg";
export const localReviewImagePath =
  "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg";
export const localUserImagePath =
  "https://cdn.pixabay.com/photo/2017/09/15/02/22/fantasy-2750995_1280.jpg";

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

export const makeIdxesArray = (
  num: number,
  visible: number,
  offset: number
): number[] => {
  switch (num) {
    case 1:
      return [visible * offset];
    case 2:
      return [visible * offset, visible * offset + 1];
    case 3:
      return [visible * offset, visible * offset + 1, visible * offset + 2];
    default:
      return [];
  }
};
