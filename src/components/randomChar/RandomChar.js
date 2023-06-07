import { useEffect, useState } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import { Link } from 'react-router-dom';

import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        upgradeChar();
    }, [])

    const onCharLoaded = (char) => {
        const newChar = char;
        if (!char.description) {
            newChar.description = 'Description of this character is not complete yet...'
        } else if (newChar.description.length > 180) {
            newChar.description = newChar.description.slice(0, 180) + '...';
        }
        setChar(newChar);
    }


    const upgradeChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011100);
        getCharacter(id)
            .then(onCharLoaded)
    }


    const errorMessenge = error ? <ErrorMessenge /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;


    return (
        <div className="randomchar">
            {errorMessenge}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={upgradeChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, id } = char;
    const verificationPageUrl = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const classImg = (verificationPageUrl === thumbnail) ? '-default' : '';
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={`randomchar__img${classImg}`} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <Link to={`/characters/${id}`} className="button button__main">
                        <div className="inner">homepage</div>
                    </Link>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div >
    )
}

export default RandomChar;