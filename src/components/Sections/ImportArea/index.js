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
function ImportArea({
    showMessage = false,
    variant = 'danger',
    message = '',
    children
}) {
    return (
        <CustomAlertContainer>
            <Alert className="custom-alert" transition show={showMessage} variant={variant}>
                <div className="text-blue text-center mb-0" dangerouslySetInnerHTML={{__html: message}} >
                    {/* {message}  */}
                </div>
                <div className="text-blue text-center mb-0">
                    {children}
                </div>
            </Alert>
        </CustomAlertContainer>
    );
}

export default ImportArea;
