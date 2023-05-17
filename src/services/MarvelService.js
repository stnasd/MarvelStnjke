import { useHttp } from "../components/hooks/http.hook"


const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // const _apiKey = 'apikey=f63df0e0ac6280a04a78500411b53931';
    // const _apiKey = 'apikey=7dae8a44fd3de105d0687f0c9cff2944';
    const _apiKey = 'apikey=e3432be01e1b4538a1a106d69d953f2d';
    const _baseOffSet = 200;
    const _baseOffSetCom = 300;


    const getAllCharacters = async (offset = _baseOffSet) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        clearError()
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?/&${_apiKey}`)
        clearError()
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffSetCom) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        clearError()
        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    const _transformComics = (item) => {
        return {
            name: item.title,
            thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
            price: item.prices[0].price,
            id: item.id
        }
    }
    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics }
}



export default useMarvelService;


