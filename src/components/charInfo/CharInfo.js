import './charInfo.scss';
import Spinner from '../spinner/spinner';
import ErrorMessenge from '../errorMessenge/errorMessenge';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types'

import { Component } from 'react';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }
    marvelService = new MarvelService();
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessenge = error ? <ErrorMessenge /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessenge}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, thumbnail, wiki, homepage, description, comics } = char;
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
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
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