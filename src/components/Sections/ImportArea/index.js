/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ImportAreaContainer } from "./style";

function ImportArea({
    children
}) {
    return (
        <ImportAreaContainer>
            {children}
        </ImportAreaContainer>
    );
}

export default ImportArea;
