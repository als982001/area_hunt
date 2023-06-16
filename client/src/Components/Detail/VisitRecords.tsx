import styled from "styled-components";
import VisitRecord from "./VisitRecord";
import { useEffect, useState } from "react";
import { getVisitRecords } from "../../utils/itemFunctions";
import RecordForm from "./RecordForm";

const Wrapper = styled.div`
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

interface IProps {
  id: string | number;
}

interface IRecord {
  id: number;
  areaId: number;
  imgPath: string;
  name: string;
  content: string;
  date: string;
}

export default function VisitRecords(props: IProps) {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const result = await getVisitRecords(props.id);
      setRecords((prev) => result);

      setIsLoading((prev) => false);
    })();
  }, []);

  return (
    <Wrapper>
      <RecordForm id={props.id} />
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          records.map((record) => (
            <VisitRecord key={record.id + ""} record={record} />
          ))
        )}
      </Container>
    </Wrapper>
  );
}
