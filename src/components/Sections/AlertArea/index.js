/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { colors } from "theme";

/**
 * 
 * @param {variant} param0 
 *'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'
 * @returns 
 */
function AlertArea({
    showMessage = false,
    variant = 'error',
    message = '',
    link

}) {
    return (
        <Alert show={showMessage} variant={variant}>
            <p className="text-blue text-center mb-0">
                You just voted with your attention! Since you viewed this
            page, the owner will be rewarded with KOI. <br />
                <b 
                    className="alert-link cursor" 
                    onClick={() => history.push("/register-content")}
                >
                    <Alert.Link href="#">an example link</Alert.Link>
            </b>
            .
        </p>
        </Alert>
    );
}

export default AlertArea;
