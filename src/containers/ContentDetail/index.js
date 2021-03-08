/* eslint-disable react-hooks/exhaustive-deps */
import React, {  } from "react";
import { Container } from "react-bootstrap";
import { ContentDetailContainer } from "./style";


function ContentDetail() {

  return (
    <ContentDetailContainer>
      <Container>
        <div className="content-detail-wrapper">
          <div className="content-detail">
            content detail
          </div>
        </div>
      </Container>
    </ContentDetailContainer>
  );
}

export default ContentDetail;
