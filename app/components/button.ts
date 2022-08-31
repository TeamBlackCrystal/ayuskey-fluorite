import { styled } from '@stitches/react';


export const Button = styled('button', {
    textAlign: "center",
    minWidth: "100px",
    minHeight: "35px",
    backgroundColor: "#99CC00",
    color: "White",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "0.1s",
    '&:hover': {
        backgroundColor: "#739900"
    },
    variants: {
        size: {
            auto: {
                width: "auto"
            },
            full: {
                width: "100%"
            }
        }
    }
})
