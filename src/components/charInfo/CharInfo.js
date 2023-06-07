import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContnent';
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './charInfo.scss';





const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const { getCharacter, clearError, process, setProcess } = useMarvelService();


    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }



    return (
        <>
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        </>
    )
}


const View = ({ data }) => {
    const { name, thumbnail, wiki, homepage, description, comics } = data;
    const classImg = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? "char__img-default" : '';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={classImg} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'No comics found for this character'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return null;
                        const url = item.resourceURI.match(/\d{2,6}/)
                        return (
                            <Link key={i} className="char__comics-item" style={{ 'fontWeight': '600', }}
                                to={`/comics/${url[0]}`}
                            >
                                {item.name}
                            </Link>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;