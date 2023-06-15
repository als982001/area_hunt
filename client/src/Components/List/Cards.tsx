import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getItemsByLocation } from "../../utils/itemFunctions";
import Spinner from "../Global/Spinner";
import Card from "./Card";
import SlideButton from "../Global/Buttons/SlideButton";

interface IProps {
  location: string;
}

interface IItem {
  id: number;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
  name: string;
  address: string;
  location: string;
  content: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  display: grid;
  grid-template-rows: 1fr 4fr;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 100px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

const box = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};

export default function Cards({ location }: IProps) {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);

  const { data, isLoading } = useQuery<IItem[]>(`${location}Items`, () =>
    getItemsByLocation(location)
  );

  const getNextCards = () => {
    console.log("zzz");

    setBack(false);
    setVisible((prev) =>
      data ? (prev === data.length - 1 ? data.length - 1 : prev + 1) : 0
    );
  };

  const getPreviosCards = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <Wrapper>
      <Title>{`${location} 지역`}</Title>
      <Container>
        {isLoading || data === undefined ? (
          <Spinner />
        ) : data.length > 0 ? (
          <>
            <AnimatePresence custom={back}>
              <Box
                custom={back}
                variants={box}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
              >
                <Card item={data[visible]} key={visible + ""} />
              </Box>
            </AnimatePresence>
            <SlideButton onClick={getNextCards} left="200px" isBefore={true} />
            <SlideButton
              onClick={getPreviosCards}
              right="200px"
              isBefore={false}
            />
          </>
        ) : (
          <h1>No Data</h1>
        )}
      </Container>
    </Wrapper>
  );
}
