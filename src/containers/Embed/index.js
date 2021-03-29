/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EmbedContainer } from "./style";
import { preUrl } from "config"

function Embed() {
  const { id } = useParams();
  // const [detail, setDetail] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // const getImage = async () => {
  //   ktools.retrieveTopContent().then((res) => {
  //     setDetail(res.find((_content) => _content.txIdContent === id));
  //     console.log({ res });
  //     setIsLoading(false);
  //   });
  // };
  // useEffect(() => {
  //   getImage();
  // }, [id])

  return (
    <EmbedContainer>
      <Image src={`${preUrl}${id}?t=${Math.random()*999999}`} width="auto" height="100%" />
    </EmbedContainer>
  );
}

export default Embed;
