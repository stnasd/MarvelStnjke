import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import PropTypes from 'prop-types';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';



import { useState, useEffect, useRef, useMemo } from 'react';

const setContent = (process, Component, newCharsLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />
            break;
        case "loading":
            return newCharsLoading ? <Component /> : <Spinner />
            break;
        case "confirmed":
            return <Component />
            break;
        case "error":
            return <ErrorMessenge />
            break;
        default:
            throw new Error('Unxpected process state')
    }
}

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charsEnded, setCharEnded] = useState(false);


    const { getAllCharacters, loading, error, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'));
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
            return (
                <CSSTransition
                    classNames="char__item"
                    timeout={700}
                    key={id}
                >
                    <li className="char__item"
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
                </CSSTransition>
            )
        })
        return <ul className="char__grid">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
    }
    // const items = charElements(chars);

    // const spinner = loading && !newCharsLoading ? <Spinner /> : null;
    // const errorMessage = error ? <ErrorMessenge /> : null;
    // const offButton = newCharsLoading ? { 'display': 'disabled' } : null;

    const elements = useMemo(() => {
        return setContent(process, () => charElements(chars), newCharsLoading)
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newCharsLoading}
            >
                <div className="inner">load more</div>
            </button >
        </div >
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;