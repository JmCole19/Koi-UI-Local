/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ImportAreaContainer } from "./style";

function ImportArea({
    children
}) {
    return (
        <ImportAreaContainer>
            <div className="sub-import-area">
                {children}
            </div>
        </ImportAreaContainer>
    );
}

export default ImportArea;
