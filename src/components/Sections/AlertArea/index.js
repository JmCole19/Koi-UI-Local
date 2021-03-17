/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert } from "react-bootstrap";
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
    children
}) {
    return (
        <CustomAlertContainer>
            <Alert className="custom-alert" show={showMessage} variant={variant}>
                <p className="text-blue text-center mb-0">
                    {message} 
                    <br />
                    {children}
                </p>
            </Alert>
        </CustomAlertContainer>
    );
}

export default AlertArea;
