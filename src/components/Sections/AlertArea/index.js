/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Alert } from "react-bootstrap";
import { CustomAlertContainer } from "./style";
import { FaTimes } from "react-icons/fa";
import { colors } from "theme";

/**
 * 
 * @param {variant} param0 
 *'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'
 * @returns 
 */
function AlertArea({
    showMessage = false,
    variant = 'danger',
    message = '',
    showCancel = false,
    cancel,
    children
}) {
    return (
        <CustomAlertContainer>
            <Alert className="custom-alert" transition show={showMessage} variant={variant}>
                {showCancel && <FaTimes
                  className="icon-close cursor"
                  color={colors.blueDark}
                  size={24}
                  onClick={cancel}
                />}
                <div className="alert-message text-blue text-center mb-0" dangerouslySetInnerHTML={{__html: message}} >
                    {/* {message}  */}
                </div>
                <div className="text-blue text-center mb-0">
                    {children}
                </div>
            </Alert>
        </CustomAlertContainer>
    );
}

export default AlertArea;
