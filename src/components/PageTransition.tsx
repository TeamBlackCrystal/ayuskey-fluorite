import {motion} from "framer-motion";
import {FC, ReactNode} from "react";

interface Props {
    children: ReactNode
}

export const PageTransition: FC<Props> = ({children}) => {
    return (
        <motion.div
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.4}}
        >
            {children}
        </motion.div>
    )
}
