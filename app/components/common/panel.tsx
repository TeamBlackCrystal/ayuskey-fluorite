import styled from "styled-components";
import { theme } from "../../theme";

export const Panel = styled.div`
background: ${theme.props.panel};
border-radius: ${theme.props.radius};
overflow: clip;
`
