import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import PropTypes from 'prop-types';


import { Component } from 'react';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newCharsLoading: false,
        offset: 200,
        charsEnded: false,
    }

    listMarvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.listMarvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({ newCharsLoading: true, })
    }

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }


        this.setState(({ chars, offset }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newCharsLoading: false,
            offset: offset + 9,
            charsEnded: ended,
        }))
    }


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = []


    refsElems = (item) => {
        this.itemRefs.push(item);
    }

    focusItem = (i) => {
        this.itemRefs.forEach((item) => {
            item.classList.remove('char__item_selected');
        })
        this.itemRefs[i].classList.add('char__item_selected');
        this.itemRefs[i].focus();
    }

    charElements = (arr) => {
        const items = arr.map((item, i) => {
            const { thumbnail, name, id } = item;
            const classImg = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? "char__img-default" : '';
            return <li className="char__item"
                ref={this.refsElems}
                key={id}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        this.props.onSelectedChar(id);
                        this.focusItem(i);
                    }
                }}
                onClick={() => {
                    this.props.onSelectedChar(id);
                    this.focusItem(i);
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
    render() {
        const { chars, loading, error, newCharsLoading, offset, charsEnded } = this.state;
        const items = this.charElements(chars);

        const errorMessage = error ? <ErrorMessenge /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;
        const offButton = this.state.newCharsLoading ? ':disabled' : 'inner';


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    onClick={() => this.onRequest(offset)}
                    disabled={newCharsLoading}
                    style={{ 'display': charsEnded ? 'none' : 'block' }}
                >
                    <div style={{ offButton }} className="inner">load more</div>
                </button >
            </div >
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;