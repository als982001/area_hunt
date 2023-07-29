import { dummyAreas, dummyVisitRecords } from "../datas/dummyData";
import path from "path";
import Account from "../models/Account";
import Test from "../models/Test";
import Place from "../models/Place";

const codes = {
  ok: 200,
  noContent: 204,
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

export const getItemsByAddress = async (req, res) => {
  const { address } = req.params;

  const itemsByAddress = dummyAreas.filter((area) =>
    area.address.includes(address)
  );

  return res.status(codes.ok).json(itemsByAddress);
};

export const getItem = async (req, res) => {
  try {
    const tests = await Test.find();

    if (tests.length === 0) {
      const newTest = await Test.create({
        content: "으하하하하!!!",
      });
    }
  } catch (error) {
    console.log("못찾음!");
    console.log(error);
  }

  const { id } = req.params;

  const item = dummyAreas.find((area) => area.id === +id);

  if (item) {
    return res.status(codes.ok).json(item);
  } else {
    return res.status(codes.notFound).end();
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;

  const image = req.file;
  const updatedData = JSON.parse(req.body.data);

  dummyAreas[updatedData.id] = {
    image,
    ...updatedData,
  };

  return res.end();
};

export const postItem = async (req, res) => {
  const place = new Place(req.body);

  try {
    const newPlace = await place.save();

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

export const getVisitRecords = async (req, res) => {
  const { id } = req.params;

  const records = dummyVisitRecords.filter((record) => record.areaId === +id);

  if (records) {
    return res.status(codes.ok).json(records);
  } else {
    return res.status(codes.notFound).end();
  }
};

export const postVisitRecords = async (req, res) => {
  const { id } = req.params;

  try {
    const image = req.file;
    const info = JSON.parse(req.body.info);
    const areaId = JSON.parse(req.body.areaId);

    dummyVisitRecords.push({
      id: dummyVisitRecords.length + 1,
      areaId: +areaId,
      imgPath: image.path,
      name: info.name,
      content: info.content,
      date: info.date,
    });

    return res.status(codes.ok).end();
  } catch (error) {
    return res.status(400).send("Error");
  }
};

export const getItemsByKeyword = async (req, res) => {
  const { keyword } = req.query;

  const result = dummyAreas.filter((item) => item.name.includes(keyword));

  return res.status(codes.ok).json(result);
};
