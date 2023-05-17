import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import PropTypes from 'prop-types';



import { useState, useEffect, useRef } from 'react';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charsEnded, setCharEnded] = useState(false);


    const { error, loading, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }



    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars([...chars, ...newChars]);
        setNewCharsLoading(newCharsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }


    const itemRefs = useRef([])


    const focusItem = (i) => {
        itemRefs.current.forEach((item) => {
            item.classList.remove('char__item_selected');
        })
        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
    }

    const charElements = (arr) => {
        const items = arr.map((item, i) => {
            const { thumbnail, name, id } = item;
            const classImg = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? "char__img-default" : '';
            return <li className="char__item"
                ref={el => itemRefs.current[i] = el}
                key={id}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onSelectedChar(id);
                        focusItem(i);
                    }
                }}
                onClick={() => {
                    props.onSelectedChar(id);
                    focusItem(i);
                }}
            >
                <img src={thumbnail} alt={name} className={classImg} />
                <div className="char__name">{name}</div>
            </li>
        })
        return <ul className="char__grid">
            {items}
        </ul>
    }
    const items = charElements(chars);

    const errorMessage = error ? <ErrorMessenge /> : null;
    const spinner = loading && !newCharsLoading ? <Spinner /> : null;
    const offButton = newCharsLoading ? ':disabled' : 'inner';


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newCharsLoading}
                style={{ 'display': charsEnded ? 'none' : 'block' }}
            >
                <div style={{ offButton }} className="inner">load more</div>
            </button >
        </div >
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;