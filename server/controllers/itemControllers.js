import { dummyAreas } from "../datas/dummyData";
import path from "path";

const codes = {
  ok: 200,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
};

export const home = async (req, res) => {
  return res.status(codes.ok).end();
};

export const getAllAreas = async (req, res) => {
  return res.status(codes.ok).json(dummyAreas);
};

export const getItem = async (req, res) => {
  const { id } = req.params;

  console.log(`id: ${id}, typeof id: ${typeof id}`);

  const item = dummyAreas.find((area) => {
    console.log(`area.id: ${area.id}, required id: ${+id}`);
    return area.id === +id;
  });

  if (item) {
    return res.status(codes.ok).json(item);
  } else {
    return res.status(codes.notFound).end();
  }
};

export const postItem = async (req, res) => {
  try {
    const areaImage = req.file;
    const areaData = req.body;

    dummyAreas.push({
      image: areaImage,
      ...areaData,
    });

    return res.status(codes.ok).end();
  } catch (error) {
    return res.status(400).send("Error");
  }
};

export const getImage = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  return res.send(filePath);
};
