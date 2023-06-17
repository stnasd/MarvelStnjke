import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { motion } from "framer-motion/dist/framer-motion"

import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);


    const { error, loading, getComic, clearError } = useMarvelService();

    const { comicId } = useParams();


    useEffect(() => {
        updateComic();
    }, [comicId])


    const updateComic = () => {

        clearError();

        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }


    const errorMessenge = error ? <ErrorMessenge /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <AppBanner />
            {errorMessenge}
            {spinner}
            {content}
        </motion.div>
    )
}



const View = ({ comic }) => {
    const { thumbnail, name, description, pageCount, language, price, } = comic;
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics book`}
                />
                <title>{name}</title>
            </Helmet>
            <div className="single-comic" >
                <img src={thumbnail} alt={name} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">language:{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back"
                    style={{ 'color': `#9f0013` }}
                >Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;