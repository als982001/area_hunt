import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";

import Spinner from "../Global/Spinner";
import Card from "./Card";
import SlideButton from "../Global/Buttons/SlideButton";
import NoData from "./NoData";
import { getItemsByAddress } from "../../utils/itemFunctions";
import { displayCenter, displayStartCenter } from "../../styles/displays";
import { absoluteCenter } from "../../styles/positions";
import { useEffect, useState } from "react";

interface IProps {
  location: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 450px;
  display: grid;
  grid-template-rows: 1fr 4fr;
`;

const Title = styled.h3`
  ${displayStartCenter}

  font-size: 30px;
  font-weight: bold;
  padding-left: 100px;
  background-color: #f1f6f9;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Container = styled.div`
  ${displayCenter}

  width: 100%;
  position: relative;
`;

const Box = styled(motion.div)<{ cardnum: number }>`
  ${absoluteCenter}

  width: 70%;
  height: 300px;
  font-size: 30px;

  display: grid;
  grid-template-columns: ${(props) =>
    props.cardnum === 0 || props.cardnum === 1
      ? "1fr"
      : props.cardnum === 2
      ? "1fr 1fr"
      : "1fr 1fr 1fr"};
  justify-items: center;
  align-items: center;
`;

const offset = 3;

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
  const [boxNum, setBoxNum] = useState(0);

  const { data, isLoading } = useQuery<IArea[]>(`${location}Items`, () =>
    getItemsByAddress(location)
  );

  const getNextCards = () => {
    setBack(false);
    setVisible((prev) => (data ? (prev === boxNum ? boxNum : prev + 1) : 0));
  };

  const getPreviosCards = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  useEffect(() => {
    setBoxNum(Math.floor((data?.length as number) / offset));
  }, [data]);

  const getMaxCardCount = (visible: number): number => {
    if (data === undefined) {
      return 0;
    }
    return data.length - visible * offset;
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
                cardnum={getMaxCardCount(visible)}
              >
                {getMaxCardCount(visible) === 0 && <span>🤗</span>}
                {getMaxCardCount(visible) === 1 && (
                  <Card
                    item={data[visible * offset]}
                    key={visible * offset + ""}
                  />
                )}
                {getMaxCardCount(visible) === 2 && (
                  <>
                    <Card
                      item={data[visible * offset]}
                      key={visible * offset + ""}
                    />
                    <Card
                      item={data[visible * offset + 1]}
                      key={visible * offset + 1 + ""}
                    />
                  </>
                )}
                {getMaxCardCount(visible) >= 3 && (
                  <>
                    <Card
                      item={data[visible * offset]}
                      key={visible * offset + ""}
                    />
                    <Card
                      item={data[visible * offset + 1]}
                      key={visible * offset + 1 + ""}
                    />
                    <Card
                      item={data[visible * offset + 2]}
                      key={visible * offset + 2 + ""}
                    />
                  </>
                )}
              </Box>
            </AnimatePresence>
            <SlideButton onClick={getNextCards} pos="left" isBefore={true} />
            <SlideButton
              onClick={getPreviosCards}
              pos="right"
              isBefore={false}
            />
          </>
        ) : (
          <NoData />
        )}
      </Container>
    </Wrapper>
  );
}
