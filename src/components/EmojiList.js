import React from "react";

function EmojiList({list}) {
    console.log('render');
    return (<div>
        <p>Список:</p>
        {list.map((emoji) => {
            return <p key={emoji.mal_id}>{emoji.title}</p>
            // return <p key={emoji.id}>{emoji.emoji} — {emoji.name}</p>
        })}
    </div>)
}
export default React.memo(EmojiList);
