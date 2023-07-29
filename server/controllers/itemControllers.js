import { dummyAreas, dummyVisitRecords } from "../datas/dummyData";
import path from "path";
import Account from "../models/Account";
import Test from "../models/Test";
import Place from "../models/Place";
import Review from "../models/Review";
import { ObjectId } from "mongodb";

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
  const places = new Place.find();

  return res.status(codes.ok).json(places);
};

export const getItemsByAddress = async (req, res) => {
  const { address } = req.params;

  const places = await Place.find({ address: new RegExp(address, "i") });

  return res.status(codes.ok).json(places);
};

export const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id);

    if (place) {
      return res.status(codes.ok).json(place);
    } else {
      return res.status(codes.notFound).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(codes.badRequest).end();
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

export const getVisitReviews = async (req, res) => {
  const { id } = req.params;

  const reviews = await Review.find({ placeId: new ObjectId(id) });
  console.log(reviews);

  if (reviews) {
    return res.status(codes.ok).json(reviews);
  } else {
    return res.status(codes.notFound).end();
  }
};

export const postVisitReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id);

    if (place) {
      const newReview = await Review.create({
        placeId: new ObjectId(id),
        placeId: place._id,
        ...req.body,
      });

      place.reviews.push(newReview._id);
      place.save();

      return res.status(codes.ok).end();
    } else {
      return res
        .status(codes.notFound)
        .send("해당하는 장소를 찾을 수 없습니다.");
    }
  } catch (error) {
    return res.status(400).send("Error");
  }
};

export const getItemsByKeyword = async (req, res) => {
  const { keyword } = req.query;

  const result = dummyAreas.filter((item) => item.name.includes(keyword));

  return res.status(codes.ok).json(result);
};
