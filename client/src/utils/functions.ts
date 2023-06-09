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
