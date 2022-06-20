export default class NotesAPI{
    //getAllNotes
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        
        //return notes;
        return notes.sort((a,b) => 
        {return new Date(a.updated) > new Date(b.updated) ? -1:1;});
    }

    //saveNote  input noteToSave --> store into localStorage
    static saveNote(noteToSave){
        // 現在 Localstorage 的資料  
        const notes = NotesAPI.getAllNotes();
        //再把新的 noteToSave 加入 存起來
        const existing = notes.find(note=> note.id == noteToSave.id);

        // Add a new Note/ Edit a existing note ??
        if(existing){
            //update
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        }else{
            //add a new one 
            noteToSave.id = Math.floor(Math.random()*10000);
            noteToSave.updated = new Date().toISOString();
            //加入新增的資料
            notes.push(noteToSave);
        }

        // save new data + existing data back into localstorage
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }
    
    //deleteNote
}