import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfoBlock from "../charInfoBlock/CharInfoBlock";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { motion } from "framer-motion/dist/framer-motion";
import { Helmet } from 'react-helmet'

import decoration from '../../resources/img/vision.png';



const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content"
                    focus={1}
                >
                    <ErrorBoundary>
                        <CharList onSelectedChar={onSelectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfoBlock charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </motion.div>
        </>
    )
}

export default MainPage;