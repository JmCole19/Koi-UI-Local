/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { colors } from "theme";

function AlertArea({
  value = 1,
}) {
  return (
    <Alert show={showMessage} variant="success">
        <p className="text-blue text-center mb-0">
            You just voted with your attention! Since you viewed this
            page, the owner will be rewarded with KOI. <br />
            <b
            className="cursor"
            onClick={() => history.push("/register-content")}
            >
            Upload something unique to start earning
            </b>
            .
        </p>
    </Alert>
  );
}

export default AlertArea;
