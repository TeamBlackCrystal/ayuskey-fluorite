import { Box } from "@chakra-ui/react"

export const NavBar = () => {
    return (
        <Box position="fixed" top="0" zIndex={1000} width="100%">
            <Box height="48px">
                <Box zIndex={1001} margin={0} padding={0} backgroundClip="content-box" fontSize="0.9rem" userSelect="none">
                    <Box display="flex" width="100%" maxWidth="1208px" margin="0 auto">
                        <Box left={0}>

                        </Box>
                        <Box>
                            
                        </Box>
                        <Box right={0}>

                        </Box>
                    </Box>

                </Box>

            </Box>
        </Box>
    )
}