/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ImportAreaContainer } from "./style";

function ImportArea({
    children
}) {
    return (
        <ImportAreaContainer>
            <div className="import-area">
                <div className="sub-import-area">
                    {children}
                </div>
            </div>
        </ImportAreaContainer>
    );
}

export default ImportArea;
