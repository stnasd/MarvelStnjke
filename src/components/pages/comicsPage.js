import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import { motion } from "framer-motion/dist/framer-motion"
import { Helmet } from 'react-helmet'


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <AppBanner />
                <ComicsList />
            </motion.div>
        </>
    )
}


export default ComicsPage;