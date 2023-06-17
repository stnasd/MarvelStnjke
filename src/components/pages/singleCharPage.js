import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { motion } from "framer-motion/dist/framer-motion"

import './singleCharPage.scss'



const SingleCharPage = () => {
    const [char, setChar] = useState(null);

    const { character } = useParams();

    const { error, loading, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter()
    }, [character])

    const updateCharacter = () => {
        clearError()
        getCharacter(character)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
            <AppBanner />
            {content}
        </motion.div>
    )
}



const View = ({ char }) => {
    const { thumbnail, name, description } = char;
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} char page`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="single-char" >
                <img src={thumbnail} alt={name} className="single-char__img" />
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
                <Link to="/" className="single-char__back"
                    style={{ 'color': `#9f0013` }}
                >Back to Main</Link>
            </div>
        </>
    )
}



export default SingleCharPage;