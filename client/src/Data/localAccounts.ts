interface IAccount {
  id: number;
  userImg: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: "f2ee15fdbeee2becc1d2abf68924d599";
    path: string;
    size: number;
  };
  userId: string;
  password: string;
  name: string;
  phone: string;
  email: string;
}

export const localAccounts = [
  {
    id: 0,
    userImg: {
      fieldname: "image",
      originalname: "106844587_p0.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      destination: "uploads/",
      filename: "testUser",
      path: "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_1280.jpg",
      size: 2410714,
    },
    userId: "test01",
    password: "test01",
    name: "홍길동",
    phone: "01011111111",
    email: "test01@email.com",
  },
];
