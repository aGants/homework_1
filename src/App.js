import React, {useCallback, useState} from 'react';
import EmojiList from './components/EmojiList.js'

function App() {
    let value = ''
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getApi = async (name) => {
        setLoading(true);
        try {
            await fetch(`https://api.jikan.moe/v3/search/anime?q=${name}`)
            // await fetch(`https://api.emojisworld.fr/v1/search?q=${value}`)
                .then(response => response.json())
                .then(data => setList(data.results));
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
        value = input;
    };

    const onChange = ((e) => {setInput(e.target.value)})

    const onSearch = useCallback( () => {
        if (value !== input) {
            const data = getApi(input);
            setList(data.results);
        }
    }, [input]);

    return (
    <div className="App">
        <input
            placeholder="Поиск"
            onChange={onChange}
        />
        <button onClick={onSearch}>Search</button>
        {isLoading ? (<p>Идет загрузка...</p>) :
            list !== undefined ? <EmojiList list={list}/> : <p>Не найдено</p>
        }
    </div>
  );
}

export default App;
