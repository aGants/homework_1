import React, {useCallback, useEffect, useMemo, useState} from 'react';
import EmojiList from './components/EmojiList.js'

function App() {
    const [value, setValue] = useState('');
    const [list, setList] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    const getApi = async () => {
        setLoading(true);
        try {
            await fetch(`https://api.jikan.moe/v3/search/anime?q=${value}`)
            // await fetch(`https://api.emojisworld.fr/v1/search?q=${value}`)
                .then(response => response.json())
                .then(data => setList(data.results));

        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    };

    const onChange = useCallback((e) => {setValue(e.target.value)}, [value])

    const onSearch = () => {
            let data = getApi();
            setList(data.results)
        };

    return (
    <div className="App">
        <input
            placeholder="Поиск"
            onChange={onChange}
        />
        <button onClick={onSearch}>Search</button>
        {isLoading ? (<p>Идет загрузка...</p>) :
            <EmojiList list={list}/>
        }
    </div>
  );
}

export default App;
