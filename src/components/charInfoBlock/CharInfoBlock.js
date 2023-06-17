import CharInfo from "../charInfo/CharInfo";
import CharSerch from "../charSerch/CharSerch";

import './charInfoblock.scss'


const CharInfoBlock = (props) => {
    return (
        <div className="char__block-info">
            <CharInfo {...props} />
            <CharSerch />
        </div>
    )
}

export default CharInfoBlock;