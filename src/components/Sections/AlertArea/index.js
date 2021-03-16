/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { colors } from "theme";
import { CustomAlertContainer } from "./style";

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
    onClick = () => {},
    link = '',
    link_message = ''
}) {
    return (
        <CustomAlertContainer>
            <Alert className="custom-alert" show={showMessage} variant={variant}>
                <p className="text-blue text-center mb-0">
                    {message} 
                    <br />
                    <b 
                        className="alert-link cursor" 
                    >
                        {link_message}
                    </b>
                </p>
            </Alert>
        </CustomAlertContainer>
    );
}

export default AlertArea;
